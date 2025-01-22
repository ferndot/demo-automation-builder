<template>
  <step-card
    title="API Request"
    @delete="$emit('delete')"
  >
    <v-form
      ref="form"
      @change="updateStep"
    >
      <v-text-field
        v-model="step.description"
        label="Description"
        variant="solo-filled"
      />
  
      <v-text-field
        v-model="config.url"
        :rules="formRules.url"
        label="URL"
        variant="solo-filled"
        required
      />

      <v-select
        v-model="config.method"
        :rules="formRules.method"
        :items="supportedMethods"
        label="Method"
        variant="solo-filled"
        required
      />

      <!--
      TODO: Add a better field to edit these
      <v-textarea
        v-model="config.headers"
        label="Headers"
        rows="3"
      /> -->

      <!-- It would be much nicer to use a JSON editor component for this -->
      <v-textarea
        v-model="config.body"
        label="Body"
        variant="solo-filled"
        rows="5"
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import type { ApiStepConfig, Step } from '@/stores/flow';

const props = defineProps<{
  step: Step,
}>();
const emit = defineEmits(['update', 'delete']);

const step = ref(props.step);
const config = step.value.config as ApiStepConfig;

const form = useTemplateRef('form');
const formRules = {
  url: [
    (v: string) => !!v || 'This is required.',
  ],
  method: [
    (v: string) => !!v || 'This is required.',
  ],
};
const formValid = computed(() => form.value?.isValid);

const updateStep = async () => {
  if (!formValid) return;
  emit('update', step.value);
}

const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
</script>