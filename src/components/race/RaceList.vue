<script setup lang="ts">
import { defineProps } from 'vue';
import type { Race } from '../../models/race/Race';
import Button from '../ui/Button.vue';

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
const handleJoinClick = (id: string) => {
  emit('join', id);
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
}

const getPlayersCount = (race: Race) => {
  return `${race.playersCount}/${race.maxPlayers}`;
}

</script>
<template>
  <table class="w-full rounded-md">
    <thead>
      <tr>
        <th>Id</th>
        <th>Created At</th>
        <th>Players</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="race in races">
        <td>{{ race.id }}</td>
        <td>{{ formatDate(race.createdAt) }}</td>
        <td>{{ getPlayersCount(race) }}</td>
        <td>
          <Button @click="handleJoinClick(race.id)">join</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>