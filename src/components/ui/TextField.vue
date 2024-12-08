<template>
  <div class="relative flex items-center w-full">
    <!-- Icono izquierdo (opcional) -->
    <span v-if="leftIcon" class="absolute left-3">
      <slot name="left-icon"></slot>
    </span>

    <!-- Input -->

    <div class="form-group w-full">
      <label v-if="label" :for="id" class="form-label">{{ label }}</label>
      <input v-bind="$attrs" v-model="inputValue" :placeholder="placeholder" :id="id" :class="[
        'w-full form-control', leftIcon ? 'pl-10' : '', rightIcon ? 'pr-10' : '']" />
    </div>


    <!-- Icono derecho (opcional) -->
    <span v-if="rightIcon" class="absolute right-3">
      <slot name="right-icon"></slot>
    </span>
  </div>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
  id: {
    type: String,
    required: false
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  leftIcon: {
    type: Boolean,
    default: false
  },
  rightIcon: {
    type: Boolean,
    default: false
  },
  borderStyle: {
    type: String,
    default: 'dashed',
  },
  label: {
    type: String,
    default: ''
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.value);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
})

</script>
