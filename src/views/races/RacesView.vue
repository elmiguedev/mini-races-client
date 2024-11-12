<script setup lang="ts">
import RaceList from '../../components/race/RaceList.vue';
import Button from '../../components/ui/Button.vue';
import { useGetRaces } from '../../hooks/races/useGetRaces';
import { useCreateRace } from '../../hooks/races/useCreateRace';
import { useRouter } from 'vue-router';

const router = useRouter();
const { races, refresh } = useGetRaces();
const { createRace, loading, error } = useCreateRace();

const handleCreateRace = async () => {
  await createRace();
  await refresh();
}

const handleJoinRace = (id: string) => {
  router.push({ name: "race", params: { raceId: id } });
}

</script>
<template>
  <h1 class="text-3xl mb-10">Races</h1>
  <div class="mb-4 flex flex-row items-end w-100">
    <Button @click="handleCreateRace" :loading="loading">Create race</Button>
  </div>
  <RaceList :races="races || []" @join="handleJoinRace" />
</template>
