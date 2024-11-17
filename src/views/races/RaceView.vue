<script setup lang="ts">
import ChatBox from '../../components/chat/ChatBox.vue';
import Button from '../../components/ui/Button.vue';
import LobbyPlayer from '../../components/race/LobbyPlayer.vue';
import Game from '@/components/game/Game.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/hooks/auth/useAuth';
import { SendPlayerChat } from '@/core/actions/race/SendPlayerChat';
import { JoinRace } from '@/core/actions/race/JoinRace';
import { LeaveRace } from '@/core/actions/race/LeaveRace';
import { SendPlayerReady } from '@/core/actions/race/SendPlayerReady';
import { SubscribeChatMessages } from '@/core/actions/race/SubscribeChatMessages';
import type { ChatMessage } from '@/core/domain/race/ChatMessage';
import type { RaceDetail } from '@/core/domain/race/RaceDetail';
import { SubscribeRaceStatus } from '@/core/actions/race/SubscribeRaceStatus';

// hooks and composables
const { token } = useAuth();
const router = useRouter();
const raceId = router.currentRoute.value.params.raceId as string;
const chatMessages = ref<Array<ChatMessage>>([]);
const raceDetail = ref<RaceDetail>();


// view state
const showGame = ref(false);

// handlers
const handlePlayerReadyClick = () => {
  SendPlayerReady();
}

const handleChatBoxMessage = (message: string) => {
  SendPlayerChat(message);
}

const checkGameReady = () => {
  if (raceDetail?.value?.status === 'ready') {
    showGame.value = true;
  }
}

onMounted(() => {

  SubscribeChatMessages({
    callback: (message: ChatMessage) => {
      chatMessages.value.push(message);
    }
  });
  SubscribeRaceStatus({
    callback: (race: RaceDetail) => {
      raceDetail.value = race;
    }
  })
  JoinRace({
    raceId,
    token
  });
})

onBeforeUnmount(() => {
  LeaveRace();
})

watch(raceDetail, () => {
  checkGameReady();
});


</script>

<template>
  <div class="font-mono flex flex-col items-center w-full px-20">
    <h1 class="text-3xl mb-10">Race Id: {{ raceDetail?.id }}</h1>
    <div v-if="!showGame" class="mb-4 flex w-full ">
      <Button @click="handlePlayerReadyClick">I'm ready</Button>
    </div>
    <div v-if="!showGame" class="flex flex-col gap-3 w-full">
      <div class="flex w-100" v-for="player in raceDetail?.players">
        <LobbyPlayer :player="player" />
      </div>
    </div>
    <div v-if="showGame">
      <Game />
    </div>
    <div v-if="!showGame">
      <ChatBox :messages="chatMessages" @send="handleChatBoxMessage" />
    </div>
  </div>
</template>