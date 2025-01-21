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
        <v-btn
          :disabled="!formsValid"
          icon="mdi-content-save"
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
              <v-form
                v-model="formsValid"
              >
                <v-text-field
                  v-model="flow.name"
                  label="Name"
                  required
                />
                <v-textarea
                  v-model="flow.description"
                  label="Description"
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
              :flow="flow"
              :step="step"
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
import { type Component, ref } from "vue";
import { VueDraggable } from 'vue-draggable-plus';
import { type Flow } from "@/stores/flow";
import ApiStep from "@/components/steps/ApiStep.vue";
import EmailStep from "@/components/steps/EmailStep.vue";

// This would be fetched from the backend
const flow = ref<Flow>({
  id: "2",
  name: "Flow 2",
  description: "This is a sample flow.",
  steps: [],
});
const formsValid = ref(false);

// This mapping could be stored in a constants file
const typeToComponent: Record<string, Component> = {
  "api": ApiStep,
  "notifications.email": EmailStep,
}

const deleteStep = (index: number) => {
  flow.value.steps?.splice(index, 1);
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