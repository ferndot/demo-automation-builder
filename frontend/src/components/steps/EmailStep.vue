<template>
  <step-card
    title="Send an Email"
    @delete="$emit('delete')"
  >
    <v-form>
      <v-text-field
        v-model="stepConfig.recipient"
        label="Recipient Email"
        type="email"
        prepend-inner-icon="mdi-email"
        required
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Flow, Step } from '@/stores/flow';

const props = defineProps<{
  flow: Flow
  step: Step
}>()
defineEmits(['delete']);

const stepConfig = ref({
  recipient: props.step.config.recipient || '',
});
</script>