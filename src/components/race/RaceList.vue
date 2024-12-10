<script setup lang="ts">
import { defineProps } from 'vue';
import type { Race } from '../../core/domain/race/Race';
import RaceRow from './RaceRow.vue';

// props
defineProps({
  races: {
    type: Array<Race>,
    required: true
  }
})

// emits
const emit = defineEmits(['join']);

// handlers
const handleRaceJoin = (id: string) => {
  emit('join', id);
}

</script>
<template>
  <div class="flex flex-col">
    <div v-for="race in races">
      <RaceRow :race="race" @join="handleRaceJoin" />
    </div>
  </div>
</template>