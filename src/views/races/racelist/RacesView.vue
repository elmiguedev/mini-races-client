<script setup lang="ts">
import { useCreateRace } from '@/hooks/races/useCreateRace';
import { useGetRaces } from '@/hooks/races/useGetRaces';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import RaceList from '@/components/race/RaceList.vue';

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
    <Button @click="handleCreateRace" :loading="loading" block>Create race</Button>
  </div>
  <RaceList :races="races || []" @join="handleJoinRace" />
</template>
