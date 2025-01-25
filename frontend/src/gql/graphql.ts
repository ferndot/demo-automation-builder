/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Map: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Flow = {
  __typename?: 'Flow';
  createdAt: Scalars['Time']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  steps: Array<Step>;
  updatedAt: Scalars['Time']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteFlow: Scalars['UUID']['output'];
  upsertFlow: Flow;
};


export type MutationDeleteFlowArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpsertFlowArgs = {
  input: UpsertFlow;
};

export type Query = {
  __typename?: 'Query';
  getFlow?: Maybe<Flow>;
  listFlows: Array<Flow>;
};


export type QueryGetFlowArgs = {
  id: Scalars['UUID']['input'];
};

export type Step = {
  __typename?: 'Step';
  config?: Maybe<Scalars['Map']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  type: StepType;
};

export enum StepType {
  IntegrationApi = 'INTEGRATION__API',
  NotificationEmail = 'NOTIFICATION__EMAIL'
}

export type UpsertFlow = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  steps: Array<UpsertStep>;
};

export type UpsertStep = {
  config?: InputMaybe<Scalars['Map']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  type: StepType;
};

export type GetFlowQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFlowQuery = { __typename?: 'Query', getFlow?: { __typename?: 'Flow', id: any, name: string, description?: string | null, steps: Array<{ __typename?: 'Step', type: StepType, description?: string | null, config?: any | null }> } | null };

export type UpdateFlowMutationVariables = Exact<{
  input: UpsertFlow;
}>;


export type UpdateFlowMutation = { __typename?: 'Mutation', upsertFlow: { __typename?: 'Flow', id: any } };

export type CreateFlowMutationVariables = Exact<{
  input: UpsertFlow;
}>;


export type CreateFlowMutation = { __typename?: 'Mutation', upsertFlow: { __typename?: 'Flow', id: any } };

export type ListFlowsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFlowsQuery = { __typename?: 'Query', listFlows: Array<{ __typename?: 'Flow', id: any, name: string, description?: string | null }> };


export const GetFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"config"}}]}}]}}]}}]} as unknown as DocumentNode<GetFlowQuery, GetFlowQueryVariables>;
export const UpdateFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertFlow"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateFlowMutation, UpdateFlowMutationVariables>;
export const CreateFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertFlow"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFlowMutation, CreateFlowMutationVariables>;
export const ListFlowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listFlows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFlows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<ListFlowsQuery, ListFlowsQueryVariables>;