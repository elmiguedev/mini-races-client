import { JoinRace } from "@/core/actions/race/JoinRace";
import { LeaveRace } from "@/core/actions/race/LeaveRace";
import { SendPlayerChat } from "@/core/actions/race/SendPlayerChat";
import { SendPlayerReady } from "@/core/actions/race/SendPlayerReady";
import { SubscribeChatMessages } from "@/core/actions/race/SubscribeChatMessages";
import { SubscribeRaceStatus } from "@/core/actions/race/SubscribeRaceStatus";
import type { ChatMessage } from "@/core/domain/race/ChatMessage";
import type { RaceDetail } from "@/core/domain/race/RaceDetail";
import { useAuth } from "@/hooks/auth/useAuth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useRaceView = () => {
  const { token } = useAuth();
  const router = useRouter();
  const raceId = router.currentRoute.value.params.raceId as string;

  const raceDetail = ref<RaceDetail>();
  const chatMessages = ref<Array<ChatMessage>>([]);
  const showGame = ref(false);

  // methods
  const checkGameReady = () => {
    if (raceDetail?.value?.status === 'ready') {
      showGame.value = true;
    }
  }

  const joinRace = () => {
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
  }

  const leaveRace = () => {
    LeaveRace();
  }

  // handlers
  const handlePlayerReadyClick = () => {
    SendPlayerReady();
  }

  const handleChatBoxMessage = (message: string) => {
    SendPlayerChat(message);
  }


  return {
    raceDetail,
    chatMessages,
    showGame,
    handleChatBoxMessage,
    handlePlayerReadyClick,
    joinRace,
    leaveRace,
    checkGameReady
  };
};