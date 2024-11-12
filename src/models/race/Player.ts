import type { PlayerRaceInfo } from "./PlayerRaceInfo";
import type { PlayerStatus } from "./PlayerStatus";


export interface Player {
  socketId: string;
  status: PlayerStatus;
  name: string;
  playerRaceInfo: PlayerRaceInfo;
}