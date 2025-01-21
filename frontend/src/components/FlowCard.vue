<template>
  <v-card :to="`/flows/${flow.id}`">
    <v-card-title>{{ props.flow.name }}</v-card-title>
  </v-card>
</template>
    
<script lang="ts" setup>
import type { Flow } from "@/stores/flow";

const props = defineProps<{
  flow: Flow
}>()
</script>
