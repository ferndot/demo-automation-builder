<template>
  <v-card :title="title">
    <template #prepend>
      <v-icon
        icon="mdi-drag"
        class="drag-handle cursor-grab"
      />
    </template>

    <template #append>
      <slot name="actions" />
      <!-- I would usually implement a delete confirmation prompt. -->
      <v-btn
        prepend-icon="mdi-delete"
        text="Delete"
        variant="tonal"
        color="red"
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

<style lang="scss" scoped>
:deep(.v-card-item__append > *) {
  margin-left: 0.5rem;
}
</style>