<template>
  <button :class="[
    'px-4 py-2 border-4 rounded-md transition-all',
    borderStyle,
    textColor,
    bgColor,
    hoverEffect,
  ]" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'default', // Variantes: default, primary, secondary
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    borderStyle() {
      return this.disabled
        ? 'border-gray-400 opacity-50 cursor-not-allowed'
        : 'border-black';
    },
    textColor() {
      return this.disabled ? 'text-gray-400' : 'text-black';
    },
    bgColor() {
      if (this.variant === 'primary') return 'bg-yellow-100';
      if (this.variant === 'secondary') return 'bg-red-100';
      return 'bg-white';
    },
    hoverEffect() {
      return this.disabled
        ? ''
        : 'hover:scale-105 hover:shadow-lg hover:border-dashed';
    },
  },
};
</script>

<style scoped>
button {
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Handwriting', sans-serif;
  font-weight: bold;
}
</style>
