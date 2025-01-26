<template>
  <v-container>
    <v-app-bar>
      <v-app-bar-title>Demo: Automation Builder</v-app-bar-title>
      <template #append>
        <v-btn
          prepend-icon="mdi-plus"
          text="Create Flow"
          variant="tonal"
          color="green"
          to="/flows/new"
        />
      </template>
    </v-app-bar>
    <v-main>
      <h1 class="mb-4">Flows</h1>
      <v-data-table
        :items="result?.listFlows"
        :headers="flowTableHeaders"
        :loading="loading"
        :sort-by="[{ key: 'name', order: 'asc' }]"
      >
        <template #no-data>
          <v-empty-state title="No flows found" class="my-10">
            <template #actions>
              <v-btn
                prepend-icon="mdi-plus"
                text="Create Flow"
                variant="tonal"
                color="green"
                to="/flows/new"
              />
            </template>
          </v-empty-state>
        </template>
        <template #item.name="{ item }">
          <router-link :to="`/flows/${item.id}`">{{ item.name }}</router-link>
        </template>
        <template #item.actions>
          <v-btn
            prepend-icon="mdi-delete"
            text="Delete"
            variant="tonal"
            color="red"
          />
        </template>
      </v-data-table>
    </v-main>
  </v-container>
</template>

<script lang="ts" setup>
import { graphql } from "@/gql";
import { useQuery, useQueryLoading } from "@vue/apollo-composable";

const loading = useQueryLoading();
const { result, refetch } = useQuery(graphql(`
  query listFlows {
    listFlows {
      id
      name
      description
    }
  }
`));

onMounted(() => {
  refetch();
});

// Defined the type here since Vuetify does not export it and TypeScript was complaining
interface FlowTableHeaders {
  title: string;
  key: string;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
}

const flowTableHeaders: FlowTableHeaders[] = [
  {
    title: 'Flow',
    key: 'name',
  },
  {
    title: 'Description',
    key: 'description',
  },
  {
    title: '',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]
</script>
