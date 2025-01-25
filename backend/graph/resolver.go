package graph

import (
	"github.com/ferndot/demo-rule-engine/graph/model"
	"github.com/google/uuid"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	FlowStore map[uuid.UUID]model.Flow
}
