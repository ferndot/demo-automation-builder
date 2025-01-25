<template>
  <v-list-item
    :title="flow.name"
    :subtitle="flow.description || undefined"
  >
    <template #append>
      <v-btn
        prepend-icon="mdi-pencil"
        text="Edit"
        variant="tonal"
        color="blue"
        :to="`/flows/${flow.id}`"
      />
      <v-btn
        prepend-icon="mdi-delete"
        text="Delete"
        variant="tonal"
        color="red"
      />
    </template>
  </v-list-item>
</template>
    
<script lang="ts" setup>
import type { Flow } from '@/gql/graphql';

defineProps<{
  flow: Flow
}>()
</script>

<style lang="scss" scoped>
:deep(.v-list-item__append > *) {
  margin-left: 0.5rem;
}
</style>
