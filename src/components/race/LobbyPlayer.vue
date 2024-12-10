<script setup lang="ts">
import type { Player } from '@/core/domain/race/Player';
import type { PropType } from 'vue';


defineProps({
  player: {
    type: Object as PropType<Player>,
    required: true
  },
})

</script>

<template>
  <div class="card bg-light border-dashed border-3 flex flex-row p-3 items-center gap-3 mb-3 w-100">
    <div class="flex items-center space-x-4 mr-auto">
      <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
        <img src="https://gravatar.com/avatar/99dc667e4344f1b75fa4e0a65808c293?s=400&d=robohash&r=x" alt="User Avatar"
          class="w-full h-full object-cover" />
      </div>
      <strong>{{ player.name }}</strong>
    </div>

    <span class="badge rounded-pill bg-primary">
      {{ player.status }}
    </span>
  </div>
</template>
