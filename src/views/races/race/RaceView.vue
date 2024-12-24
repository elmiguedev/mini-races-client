<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ChatBox from '../../../components/chat/ChatBox.vue';
import Button from '../../../components/ui/Button.vue';
import LobbyPlayer from '../../../components/race/LobbyPlayer.vue';
import LobbyEmptyPlayer from '../../../components/race/LobbyEmptyPlayer.vue';
import RaceChat from './components/RaceChat.vue';
import Game from '@/components/game/Game.vue';
import { useRaceView } from './hooks/useRaceView';

const {
  raceDetail,
  chatMessages,
  showGame,
  handleChatBoxMessage,
  handlePlayerReadyClick,
  checkGameReady,
  joinRace,
  leaveRace,
  emptySlots
} = useRaceView();

onMounted(() => {
  joinRace();
})

onBeforeUnmount(() => {
  leaveRace();
})

watch(raceDetail, () => {
  checkGameReady();
});

</script>

<template>
  <div class="flex flex-col items-center w-full ">
    <h1 class="text-3xl mb-10">Race Id: {{ raceDetail?.id }}</h1>
    <div v-if="!showGame" class="flex flex-col gap-3 w-full mb-3">
      <div class="flex w-100" v-for="player in raceDetail?.players">
        <LobbyPlayer :player="player" />
      </div>

      <div class="flex w-100" v-for="i in emptySlots">
        <LobbyEmptyPlayer />
      </div>
    </div>

    <div v-if="showGame">
      <Game />
    </div>

    <div v-if="!showGame" class="mb-4 flex w-full ">
      <Button @click="handlePlayerReadyClick" block>I'm ready</Button>
    </div>

    <RaceChat :messages="chatMessages" @send="handleChatBoxMessage" />
  </div>
</template>