import { RaceSocketManager } from "@/core/services/RaceSocketManager"
import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys"

export const SendPlayerReady = () => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_READY,
    data: {}
  })
}