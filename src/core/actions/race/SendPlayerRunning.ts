import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys"
import { RaceSocketManager } from "@/hooks/races/useRaceSocket"

export const SendPlayerRunning = () => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_RUNNING,
    data: {}
  })
}