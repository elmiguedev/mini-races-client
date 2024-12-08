<template>
  <button :type="type" :class="classes" @click="handleClick">
    <slot></slot>
    <span v-if="loading" class="paper-progress-indeterminate"></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
});

const classes = computed(() => {
  const variantClass = `btn-${props.variant}`;
  const blockClass = props.block ? 'btn-block' : '';
  return `paper-btn ${variantClass} ${blockClass}`;
});

const emit = defineEmits(['click']);

const handleClick = (event: Event) => {
  if (props.loading) {
    return;
  }
  emit('click', event);
};

</script>