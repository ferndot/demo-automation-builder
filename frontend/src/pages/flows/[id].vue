<template>
  <v-progress-linear
    v-if="loading"
    indeterminate
    absolute
    bottom
  />
  <flow-editor
    v-if="result?.getFlow"
    :flow="result.getFlow"
    @update="updateFlow"
  />
</template>

<script lang="ts" setup>
import { graphql } from '@/gql';
import type { UpsertFlow } from '@/gql/graphql';
import { useMutation, useQuery, useQueryLoading } from '@vue/apollo-composable';

const route = useRoute('/flows/[id]');
const loading = useQueryLoading();
const { result, refetch } = useQuery(graphql(`
  query getFlow($id: UUID!) {
    getFlow(id: $id) {
      id
      name
      description
      steps {
        type
        description
        config
      }
    }
  }
`), { id: route.params.id });

const { mutate } = useMutation(graphql(`
  mutation updateFlow($input: UpsertFlow!) {
    upsertFlow(input: $input) {
      id
    }
  }
`))

const updateFlow = async (flow: UpsertFlow) => {
  await mutate({ input: flow });
  await refetch();
}
</script>
