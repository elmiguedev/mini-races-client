import { RaceSocketManager } from "@/core/services/RaceSocketManager"
import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys"

export const SendPlayerInRace = () => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_IN_RACE,
    data: {}
  })
}