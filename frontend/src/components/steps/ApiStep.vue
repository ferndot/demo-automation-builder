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
        v-model="editedStep.description"
        label="Description"
        variant="solo-filled"
      />
  
      <v-text-field
        v-model="editedStep.config.url"
        :rules="formRules.url"
        label="URL"
        variant="solo-filled"
        required
      />

      <v-select
        v-model="editedStep.config.method"
        :rules="formRules.method"
        :items="supportedMethods"
        label="Method"
        variant="solo-filled"
        required
      />

      <!--
      TODO: Add a better field to edit these
      <v-textarea
        v-model="editedStep.config.headers"
        label="Headers"
        rows="3"
      /> -->

      <!-- It would be much nicer to use a JSON editor component for this -->
      <v-textarea
        v-model="editedStep.config.body"
        label="Body"
        variant="solo-filled"
        rows="5"
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import type { Step, UpsertStep } from '@/gql/graphql';
import type { VForm } from 'vuetify/components';

const props = defineProps<{
  step: Step,
}>();
const emit = defineEmits(['update', 'delete']);

const editedStep = ref({...props.step as UpsertStep});

const form = useTemplateRef<VForm>('form');
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
  emit('update', editedStep.value);
}

const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
</script>