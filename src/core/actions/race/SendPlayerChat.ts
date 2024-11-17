import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys";
import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export const SendPlayerChat = (message: string) => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_CHAT,
    data: {
      message
    }
  });
};