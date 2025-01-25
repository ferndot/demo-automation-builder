<template>
  <v-progress-linear
    v-if="loading"
    indeterminate
    absolute
    bottom
  />
  <flow-editor
    :flow="flow"
    @update="createFlow"
  />
</template>

<script lang="ts" setup>
import type { GetFlowQuery, UpsertFlow } from '@/gql/graphql';
import router from '@/router';
import { useMutation, useQueryLoading } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const flow: GetFlowQuery['getFlow'] = {
  id: null,
  name: '',
  description: '',
  steps: [],
};

const loading = useQueryLoading();
const { mutate } = useMutation(gql`
  mutation createFlow($input: UpsertFlow!) {
    upsertFlow(input: $input) {
      id
    }
  }
`)

const createFlow = async (flow: UpsertFlow) => {
  const result = await mutate({ input: flow });
  router.push(`/flows/${result?.data.upsertFlow.id}`);
}
</script>
