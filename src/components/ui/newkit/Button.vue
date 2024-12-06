<template>
  <button class="px-4 py-2 bg-primary text-white font-sketchy border-sketchy shadow-sketchy hover:bg-primary/90">
    Botón Sketchy
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'primary' | 'secondary';
  styleType?: 'filled' | 'outline';
  disabled?: boolean;
}

// Props
const props = defineProps<Props>();
const { variant = 'default', styleType = 'outline', disabled = false } = props;

// Computed classes
const borderStyle = computed(() =>
  disabled
    ? 'border-gray-400 opacity-50 cursor-not-allowed'
    : 'border-black'
);

const textColor = computed(() => {
  if (disabled) return 'text-gray-400';
  if (styleType === 'filled') return 'text-white';
  return variant === 'primary'
    ? 'text-yellow-600'
    : variant === 'secondary'
      ? 'text-red-600'
      : 'text-black';
});

const bgColor = computed(() => {
  if (disabled) return 'bg-gray-200';
  if (styleType === 'filled') {
    return variant === 'primary'
      ? 'bg-yellow-600'
      : variant === 'secondary'
        ? 'bg-red-600'
        : 'bg-black';
  }
  return 'bg-transparent';
});
</script>

<style scoped>
button {
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Handwriting', sans-serif;
  font-weight: bold;
}
</style>
