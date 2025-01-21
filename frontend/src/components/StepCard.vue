<template>
  <v-card :title="title">
    <template #append>
      <!-- I would usually implement a delete confirmation prompt. -->
      <v-btn
        icon="mdi-delete"
        @click="$emit('delete')"
      />
    </template>
    <v-card-text><slot /></v-card-text>
  </v-card>
</template>
    
<script lang="ts" setup>
defineProps<{
  title: string,
}>();

defineEmits(['delete']);
</script>
