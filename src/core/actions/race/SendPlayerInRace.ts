import { SocketMessageKeys } from "@/core/utils/SocketMessageKeys"
import { RaceSocketManager } from "@/hooks/races/useRaceSocket"

export const SendPlayerInRace = () => {
  RaceSocketManager.getInstance().sendMessage({
    key: SocketMessageKeys.PLAYER_IN_RACE,
    data: {}
  })
}