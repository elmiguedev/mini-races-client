import { RaceSocketManager } from "@/core/services/RaceSocketManager"
import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys"

export const SendPlayerRunning = () => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_RUNNING,
    data: {}
  })
}