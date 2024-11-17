import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys";
import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export interface SendPlayerMoveParams {
  accelerate: boolean;
  left: boolean;
  right: boolean;
}

export const SendPlayerMove = (params: SendPlayerMoveParams) => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_MOVE,
    data: params
  });
}