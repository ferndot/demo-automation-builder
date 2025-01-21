<template>
  <step-card
    title="Email"
    @delete="$emit('delete')"
  >
    <template #actions>
      <!-- Example of custom action offering preview functionality -->
      <v-btn
        icon="mdi-eye"
      />
    </template>
  
    <v-form>
      <v-text-field
        v-model="step.description"
        label="Description"
      />

      <v-text-field
        v-model="config.recipient"
        label="Recipient Email"
        type="email"
        required
      />

      <v-text-field
        v-model="config.subject"
        label="Subject"
        required
      />

      <v-textarea
        v-model="config.body"
        label="Body"
        required
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type EmailStepConfig, type Flow, type Step } from '@/stores/flow';

const props = defineProps<{
  flow: Flow
  step: Step
}>()
defineEmits(['update', 'delete']);

const step = ref(props.step);
const config = step.value.config as EmailStepConfig;
</script>
