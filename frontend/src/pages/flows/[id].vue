<template>
  <v-container fluid>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          icon="mdi-close"
          to="/"
        />
      </template>
  
      <v-app-bar-title>Edit Flow: {{ flow.name }}</v-app-bar-title>

      <template #append>
        <!-- This button would allow the user to preview the flow -->
        <v-btn
          :disabled="!formsValid"
          prepend-icon="mdi-eye"
          text="Preview"
          variant="tonal"
          color="blue"
        />
        <v-btn
          :disabled="!formsValid"
          prepend-icon="mdi-content-save"
          text="Save"
          variant="tonal"
          color="green"
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
                  v-model="flow.name"
                  :rules="formRules.name"
                  label="Name"
                  variant="solo-filled"
                  required
                />
                <v-textarea
                  v-model="flow.description"
                  label="Description"
                  variant="solo-filled"
                />
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <VueDraggable
            v-model="flow.steps"
            group="steps"
            handle=".drag-handle"
            filter=".drag-disabled"
            :animation="150"
            class="steps-container h-100"
          >
            <component
              :is="typeToComponent[step.type]"
              v-for="step, index in flow.steps"
              :key="step.id"
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
import { VueDraggable } from 'vue-draggable-plus';
import { type Flow, type Step } from "@/stores/flow";
import ApiStep from "@/components/steps/ApiStep.vue";
import EmailStep from "@/components/steps/EmailStep.vue";

const form = useTemplateRef('form');
const formRules = {
  name: [
    (v: string) => !!v || 'This is required.',
  ],
};

// Todo: this would be true if the flow form and all steps were valid.
const formsValid = computed(() => true);

// This would be fetched from the backend
const flow = ref<Flow>({
  id: "2",
  name: "Flow 2",
  description: "This is a sample flow.",
  steps: [],
});

// This mapping could be stored in a constants file
const typeToComponent: Record<string, Component> = {
  "api": ApiStep,
  "notifications.email": EmailStep,
}

const updateStep = (index: number, step: Step) => {
  flow.value.steps[index] = step;
}

const deleteStep = (index: number) => {
  flow.value.steps?.splice(index, 1);
}
</script>

<style lang="scss" scoped>
:deep(.v-toolbar__append) {
  padding: 12px;

  & > * {
    margin-left: 0.5rem;
  }
}

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
