import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export interface JoinRaceParams {
  raceId: string;
  token: string;
}

export const JoinRace = (params: JoinRaceParams) => {
  RaceSocketManager.getInstance().connect(params.raceId, params.token);
}