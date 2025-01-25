import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:8080/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export default new ApolloClient({
  link: httpLink,
  cache,
})
