<template>
  <v-navigation-drawer
    location="right"
    width="400"
    permanent
    order="-1"
  >
    <v-text-field
      v-model="query"
      label="Search available step types"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
      class="search-box"
    />
    <v-card
      v-for="step in filteredSteps"
      :key="step.type"
      class="ma-4"
      variant="flat"
      :title="step.title"
      :subtitle="step.description"
      :prepend-icon="step.icon"
      color="grey-darken-3"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { StepType } from '@/stores/flow';

const query = ref('');

// In an ideal implementation, these step types would be fetched from an API endpoint
const steps = ref<StepType[]>([
    {
        title: 'Make an API Request',
        type: 'api',
        description: 'Sends an HTTP request to an API endpoint.',
        icon: 'mdi-api',
    },
    {
        title: 'Send an Email',
        type: 'notifications.email',
        description: 'Sends an email notification.',
        icon: 'mdi-email',
    }
])

// Apply search query if provided
const filteredSteps = computed(() => {
    return steps.value.filter(step =>
        step.title.toLowerCase().includes(query.value.toLowerCase())
    );
});
</script>

<style scoped>
.search-box :deep(.v-input__control) {
    height: 64px;
}
</style>
