import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export const LeaveRace = () => {
  RaceSocketManager.getInstance().disconnect();
}