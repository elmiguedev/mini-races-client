<script setup lang="ts">
import ChatBox from '../../components/chat/ChatBox.vue';
import Button from '../../components/ui/Button.vue';
import LobbyPlayer from '../../components/race/LobbyPlayer.vue';
import Game from '@/components/game/Game.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RaceSocketManager, useRaceSocket } from '../../hooks/races/useRaceSocket';
import { useRouter } from 'vue-router';
import { useAuth } from '@/hooks/auth/useAuth';
import type { ChatMessage } from '@/models/race/ChatMessage';

// hooks and composables
const { token } = useAuth();
const router = useRouter();
const chats = ref<Array<ChatMessage>>([]);
const raceId = router.currentRoute.value.params.raceId as string;

// const { connect, raceDetail, sendChatMessage, disconnect, sendPlayerReady, chatMessages } = useRaceSocket();

// view state
const showGame = ref(false);

// handlers
const handlePlayerReadyClick = () => {
  // sendPlayerReady();
}

const handleChatBoxMessage = (message: string) => {
  // sendChatMessage(message);
  RaceSocketManager.getInstance().sendChatMessage(message);
}

const checkGameReady = () => {
  // if (raceDetail?.value?.status === 'ready') {
  //   showGame.value = true;
  // }
}

onMounted(() => {
  // connect(raceId, token);
  RaceSocketManager.getInstance().connect(raceId, token);
  RaceSocketManager.getInstance().addChatMessageListener(() => {
    chats.value = RaceSocketManager.getInstance().chatMessages;
  })
})

onBeforeUnmount(() => {
  // disconnect();
})

// watch(raceDetail, () => {
//   checkGameReady();
// });


</script>

<template>
  <div class="font-mono flex flex-col items-center w-full px-20">
    <!-- <h1 class="text-3xl mb-10">Race Id: {{ raceDetail?.id }}</h1> -->
    <div v-if="!showGame" class="mb-4 flex w-full ">
      <Button @click="handlePlayerReadyClick">I'm ready</Button>
    </div>
    <div v-if="!showGame" class="flex flex-col gap-3 w-full">
      <!-- <div class="flex w-100" v-for="player in raceDetail?.players">
        <LobbyPlayer :player="player" />
      </div> -->
    </div>
    <div v-if="showGame">
      <Game />
    </div>
    <div v-if="!showGame">
      <ChatBox :messages="chats" @send="handleChatBoxMessage" />
    </div>
  </div>
</template>