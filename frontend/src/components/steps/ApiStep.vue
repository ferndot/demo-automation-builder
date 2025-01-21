<template>
  <step-card
    title="Make an API Request"
    @delete="$emit('delete')"
  >
    <v-form>
      <v-text-field
        v-model="stepConfig.url"
        label="URL"
        prepend-inner-icon="mdi-link"
        required
      />

      <v-select
        v-model="stepConfig.method"
        :items="supportedMethods"
        label="Method"
        required
      />

      <v-textarea
        v-model="stepConfig.headers"
        label="Headers"
        rows="3"
      />

      <!-- It would be much nicer to use a JSON editor component for this -->
      <v-textarea
        v-model="stepConfig.body"
        label="Body"
        rows="5"
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Step } from '@/stores/flow';

const props = defineProps<{
  step: Step,
}>()
defineEmits(['delete']);

const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const stepConfig = ref({
  url: props.step.config.url || '',
  method: props.step.config.method || 'GET',
  headers: props.step.config.headers || [],
  body: props.step.config.body || '',
});
</script>