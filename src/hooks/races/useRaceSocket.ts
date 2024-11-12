import { ref } from "vue";
import type { ChatMessage } from "../../models/race/ChatMessage";
import { useAuth } from "../auth/useAuth";
import type { RaceDetail } from "@/models/race/RaceDetail";

export interface SocketMessage {
  key: string;
  data: any;
}

export const useRaceSocket = (raceId: string) => {
  const socket = ref<WebSocket>();
  const raceDetail = ref<RaceDetail>();
  const chatMessages = ref<Array<ChatMessage>>([]);
  const { user, token } = useAuth();

  const connect = () => {
    socket.value = new WebSocket('ws://localhost:3000/races/' + raceId + "?token=" + token);
    socket.value.addEventListener('message', (event: any) => {
      handleMessage(event);
    })
  }

  const handleMessage = (event: any) => {
    const message = JSON.parse(event.data) as SocketMessage;
    switch (message.key) {
      case "player_chat":
        chatMessages.value.push(message.data);
        break;

      case "race_status":
        raceDetail.value = message.data;
        break;

      default:
        break;
    }
  }

  const sendMessage = (message: SocketMessage) => {
    socket.value?.send(JSON.stringify(message));
  }

  const sendChatMessage = (message: string) => {
    sendMessage({
      key: 'player_chat', data: {
        message
      }
    });
  }

  const disconnect = () => {
    socket.value?.close();
  }

  return {
    raceDetail,
    chatMessages,
    connect,
    sendChatMessage,
    disconnect
  }
}