<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { ChatMessage } from '../../../../core/domain/race/ChatMessage';

const props = defineProps({
  owner: {
    type: Boolean,
    default: true
  },
  message: {
    type: Object as () => ChatMessage,
  }
})

const classes = computed(() => {
  return `badge bg-primary mb-1 text-left flex flex-col gap-1 ${props.owner ? "ml-auto" : "mr-auto"}`
})

</script>
<template>
  <div :class="classes">
    <span v-if="!props.owner">{{ props.message?.name }}:</span>
    <span>{{ props.message?.message }}</span>
  </div>
</template>