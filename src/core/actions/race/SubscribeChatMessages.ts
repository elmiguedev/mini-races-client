import type { ChatMessage } from "@/core/domain/race/ChatMessage";
import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export interface SubscribeChatMessagesParams {
  callback: (message: ChatMessage) => void;
}

export const SubscribeChatMessages = ({ callback }: SubscribeChatMessagesParams) => {
  RaceSocketManager.getInstance().addPlayerChatListener(callback);
}