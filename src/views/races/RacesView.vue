<script setup lang="ts">
import { ref } from 'vue';
import type { Race } from '../../models/race/Race';
import RaceList from '../../components/race/RaceList.vue';
import Button from '../../components/ui/Button.vue';
import { useGetRaces } from '../../hooks/races/useGetRaces';
import { useCreateRace } from '../../hooks/races/useCreateRace';

// const races = ref<Array<Race>>([]);
const { races, refresh } = useGetRaces();
const { createRace, loading, error } = useCreateRace();

console.log("LAS RACES", races.value)

const handleCreateRace = async () => {
  await createRace();
  await refresh();
}

</script>
<template>
  <h1 class="text-3xl mb-10">Races</h1>
  <div class="mb-4 flex flex-row items-end w-100">
    {{ JSON.stringify(error) }}
    <Button @click="handleCreateRace" :loading="loading">Create race</Button>
  </div>
  <RaceList :races="races || []" />
</template>
