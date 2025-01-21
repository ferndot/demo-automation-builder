<template>
  <v-container>
    <v-app-bar>
      <v-app-bar-title>Demo: Rule Engine</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <FlowCard
        v-for="flow in flows"
        :key="flow.id"
        :flow="flow"
      />
    </v-main>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FlowThumbnail } from "@/stores/flow";

const flows = ref<Array<FlowThumbnail>>([
  {
    id: "1",
    name: "Flow 1",
  },
  {
    id: "2",
    name: "Flow 2",
  }
]);
</script>
