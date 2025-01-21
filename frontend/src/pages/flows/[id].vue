<template>
  <v-container>
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
          <v-card class="my-4">
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
          <template
            v-for="step, index in flow.steps"
            :key="step.id"
          >
            <div 
              v-if="index % 2 === 1"
              class="text-center"
            >
              <v-icon icon="mdi-arrow-down" />
            </div>

            <component
              :is="typeToComponent[step.type]"
              class="my-4"
              :flow="flow"
              :step="step"
              @delete="deleteStep(index)"
            />
          </template>
        </v-col>
      </v-row>
    </v-main>
  
    <step-sidebar />
  </v-container>
</template>
  
<script lang="ts" setup>
import { type Component, ref } from "vue";
import { type Flow } from "@/stores/flow";
import ApiStep from "@/components/steps/ApiStep.vue";
import EmailStep from "@/components/steps/EmailStep.vue";

const flow = ref<Flow>({
  id: "2",
  name: "Flow 2",
  description: "This is a sample flow.",
  steps: [
    {
      id: "1",
      type: "api",
      description: "This is step 1",
      config: {}
    },
    {
      id: "2",
      type: "notifications.email",
      description: "This is step 2",
      config: {}
    },
  ],
});
const formsValid = ref(false);

const typeToComponent: Record<string, Component> = {
  "api": ApiStep,
  "notifications.email": EmailStep,
}

const deleteStep = (index: number) => {
  flow.value.steps?.splice(index, 1);
}
</script>
