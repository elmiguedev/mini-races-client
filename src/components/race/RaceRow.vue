<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue';
import type { Race } from '../../core/domain/race/Race';

const MAX_ID_CHARS = 4;

const props = defineProps({
  race: {
    type: Object as PropType<Race>,
    required: true
  },
})

const emit = defineEmits(['join']);

const raceId = computed(() =>
  "..." + props.race?.id.substring(
    props.race.id.length - MAX_ID_CHARS,
    props.race.id.length
  )
);

const players = computed(() =>
  `${props.race.playersCount}/${props.race.maxPlayers}`
);

const canJoin = computed(() =>
  props.race.playersCount < props.race.maxPlayers
);


const handleJoinClick = (id: string) => {
  emit('join', id);
}

</script>

<template>
  <div class="card bg-light border-dashed border-3 flex flex-row p-3 items-center gap-3 mb-3 ">
    <div>
      ID: {{ raceId }}
    </div>
    <div class="ml-auto flex flex-row items-center">
      <div class="mr-4">
        <span class="badge rounded-pill bg-primary">
          {{ race.status }}
        </span>
      </div>
      <div class="mr-4">
        {{ players }}
      </div>
      <button :disabled="!canJoin" @click="handleJoinClick(race.id)" class="btn btn-primary px-4">Join</button>
    </div>
  </div>
</template>

<style scoped></style>