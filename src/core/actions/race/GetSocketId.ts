import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export const GetSocketId = () => {
  return RaceSocketManager.getInstance().getId();
}