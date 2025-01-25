package main

import (
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/ferndot/demo-rule-engine/graph"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8080"
const defaultAllowedOrigins = "http://localhost:*"

func main() {
	router := chi.NewRouter()

	// Default to port 8080 if not specified in the environment
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Default allowed origins to localhost
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = defaultAllowedOrigins
	}

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{allowedOrigins},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// Handle cross-origin checks in websocket upgrade requests:
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				// Check against your desired domains here
				return r.Host == "example.org"
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	router.Handle("/", playground.Handler("Rule Engine - API Playground", "/graphql"))
	router.Handle("/graphql", srv)

	err := http.ListenAndServe(":"+defaultPort, router)
	if err != nil {
		panic(err)
	}
}
