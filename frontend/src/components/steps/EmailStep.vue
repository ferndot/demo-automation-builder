<template>
  <step-card
    title="Email"
    @delete="$emit('delete')"
  >
    <template #actions>
      <!-- Example of custom action offering preview functionality -->
      <v-btn
        disabled
        prepend-icon="mdi-eye"
        text="Preview"
        variant="tonal"
        color="blue"
      />
    </template>
  
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
        v-model="editedStep.config.recipient"
        :rules="formRules.recipient"
        label="Recipient Email"
        variant="solo-filled"
        type="email"
        required
      />

      <v-text-field
        v-model="editedStep.config.subject"
        :rules="formRules.subject"
        label="Subject"
        variant="solo-filled"
        required
      />

      <v-textarea
        v-model="editedStep.config.body"
        :rules="formRules.body"
        label="Body"
        variant="solo-filled"
        required
      />
    </v-form>
  </step-card>
</template>

<script lang="ts" setup>
import type { Step, UpsertStep } from '@/gql/graphql';
import type { VForm } from 'vuetify/components';

const props = defineProps<{
  step: Step
}>();
const emit = defineEmits(['update', 'delete']);

const editedStep = ref({...props.step as UpsertStep});

const form = useTemplateRef<VForm>('form');
const formRules = {
  recipient: [
    (v: string) => !!v || 'This is required.',
    (v: string) => {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(v) || 'This must be a valid email address.'
    }
  ],
  subject: [
    (v: string) => !!v || 'This is required.',
  ],
  body: [
    (v: string) => !!v || 'This is required.',
  ],
};
const formValid = computed(() => form.value?.isValid);

const updateStep = async () => {
  if (!formValid) return;
  emit('update', editedStep.value);
}
</script>
