<template>
  <v-container fluid>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          icon="mdi-close"
          to="/"
        />
      </template>
  
      <v-app-bar-title>
        <template v-if="flow.name">
          Edit Flow: {{ flow.name }}
        </template>
        <template v-else>
          New Flow
        </template>
      </v-app-bar-title>

      <template #append>
        <!-- This button would allow the user to preview the flow -->
        <v-btn
          disabled
          prepend-icon="mdi-eye"
          text="Preview"
          variant="tonal"
          color="blue"
        />
        <v-btn
          :disabled="!canSave"
          prepend-icon="mdi-content-save"
          text="Save"
          variant="tonal"
          color="green"
          @click="updateFlow"
        />
      </template>
    </v-app-bar>
    <v-main>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-card>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="editedFlow.name"
                  :rules="formRules.name"
                  label="Name"
                  variant="solo-filled"
                  required
                />
                <v-textarea
                  v-model="editedFlow.description"
                  label="Description"
                  variant="solo-filled"
                />
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <VueDraggable
            v-model="editedFlow.steps"
            group="steps"
            handle=".drag-handle"
            filter=".drag-disabled"
            :animation="150"
            class="steps-container h-100"
          >
            <component
              :is="typeToComponent[step.type]"
              v-for="step, index in editedFlow.steps"
              :key="index"
              class="mb-4"
              :step="step"
              @update="updateStep(index, $event)"
              @delete="deleteStep(index)"
            />
          </VueDraggable>
        </v-col>
      </v-row>
    </v-main>
  
    <step-sidebar />
  </v-container>
</template>
  
<script lang="ts" setup>
import { isEqual } from 'lodash';
import { VueDraggable } from 'vue-draggable-plus';
import type { VForm } from 'vuetify/components';
import ApiStep from "@/components/steps/ApiStep.vue";
import EmailStep from "@/components/steps/EmailStep.vue";
import type { UpsertFlow, UpsertStep } from '@/gql/graphql';

const props = defineProps<{
  flow: UpsertFlow
}>();
const emits = defineEmits<{
  (e: 'update', value: UpsertFlow): void
}>();

const editedFlow = ref(structuredClone(props.flow));

// This mapping could be stored in a constants file
const typeToComponent: Record<string, Component> = {
  "INTEGRATION__API": ApiStep,
  "NOTIFICATION__EMAIL": EmailStep,
}

const form = useTemplateRef<VForm>('form');
const formRules = {
  name: [
    (v: string) => !!v || 'This is required.',
  ],
};
const formValid = computed(() => form.value?.isValid);

// TODO: This has a bug where saves are allowed when a step is first added, but is not yet valid.
const canSave = computed(() => formValid.value && !isEqual(editedFlow.value, props.flow));

const updateStep = (index: number, step: UpsertStep) => {
  editedFlow.value.steps[index] = step;
}

const deleteStep = (index: number) => {
  editedFlow.value.steps?.splice(index, 1);
}

const updateFlow = () => {
  if (!canSave.value) return;
  emits('update', editedFlow.value);
}
</script>

<style lang="scss" scoped>
.steps-container:empty {
  background-color: rgb(var(--v-theme-surface));
  border: 2px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "Drag and drop steps here.";
  }
}
</style>
  