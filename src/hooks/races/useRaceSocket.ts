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
      case "chat":
        chatMessages.value.push({
          message: message.data.message,
          name: message.data.name
        });
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
      key: 'chat', data: {
        name: user.name,
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