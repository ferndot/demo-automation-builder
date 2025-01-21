<template>
  <step-card
    title="API Request"
    @delete="$emit('delete')"
  >
    <v-form>
      <v-text-field
        v-model="step.description"
        label="Description"
      />
  
      <v-text-field
        v-model="config.url"
        label="URL"
        required
      />

      <v-select
        v-model="config.method"
        :items="supportedMethods"
        label="Method"
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
        rows="5"
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ApiStepConfig, Step } from '@/stores/flow';

const props = defineProps<{
  step: Step,
}>()
defineEmits(['update', 'delete']);

const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const step = ref(props.step);
const config = step.value.config as ApiStepConfig;
</script>