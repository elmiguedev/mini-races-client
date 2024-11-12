import { ref } from "vue";
import type { ChatMessage } from "../../models/race/ChatMessage";
import { useAuth } from "../auth/useAuth";

export interface SocketMessage {
  key: string;
  data: any;
}

export const useRaceSocket = (raceId: string) => {
  const socket = ref<WebSocket>();
  const raceDetail = ref();
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

  return {
    raceDetail,
    chatMessages,
    connect,
    sendChatMessage
  }
}