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
      type="search"
      class="search-box"
      variant="solo-filled"
      tile
      append-inner-icon="mdi-magnify"
      clearable
      hide-details
    />

    <VueDraggable
      v-model="filteredSteps"
      :group="{
        name: 'steps',
        pull: 'clone',
        put: false,
      }"
      :sort="false"
      :clone="createStep"
    >
      <v-card
        v-for="step in filteredSteps"
        :key="step.type"
        class="step-type-card cursor-grab"
        variant="flat"
        :title="step.title"
        :subtitle="step.description"
        color="grey-darken-3"
      >
        <template #prepend>
          <v-icon
            :icon="step.icon"
            size="x-large"
            class="mr-2"
          />
        </template>
      </v-card>
    </VueDraggable>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus';
import type { ApiStepConfig, EmailStepConfig, StepType } from '@/stores/flow';

const query = ref(null);

// In an ideal implementation, these step types would be fetched from an API endpoint
const steps = ref<StepType[]>([
  {
    title: 'API Request',
    type: 'api',
    description: 'Makes an HTTP request to an API endpoint.',
    icon: 'mdi-api',
    baseConfig: <ApiStepConfig>{
      url: '',
      method: 'GET',
      headers: {},
      body: '',
    },
  },
  {
    title: 'Email',
    type: 'notifications.email',
    description: 'Sends an email notification.',
    icon: 'mdi-email',
    baseConfig: <EmailStepConfig>{
      recipient: '',
      subject: '',
      body: '',
    },
  }
])

// Apply search query if provided
const filteredSteps = computed(() => {
  return steps.value.filter(step =>
    step.title.toLowerCase().includes((query.value ?? '').toLowerCase())
  );
});

const createStep = (element: StepType) => {
  return {
    id: null,
    type: element.type,
    description: '',
    config: element.baseConfig,
  };
};
</script>

<style lang="scss" scoped>
.step-type-card {
  margin: 16px;
}

.search-box :deep(.v-input__control) {
  height: 64px;
}
</style>
