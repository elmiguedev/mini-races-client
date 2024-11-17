import type { RaceDetail } from "@/core/domain/race/RaceDetail";
import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export interface SubscribeRaceStatusParams {
  callback: (race: RaceDetail) => void;
}

export const SubscribeRaceStatus = ({ callback }: SubscribeRaceStatusParams) => {
  RaceSocketManager.getInstance().addRaceDetailListener(callback);
}