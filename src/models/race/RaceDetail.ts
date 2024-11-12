import type { ChatMessage } from "./ChatMessage";
import type { Player } from "./Player";
import type { RaceStatus } from "./RaceStatus";

export interface RaceDetail {
  id: string;
  maxPlayers: number;
  players: Record<string, Player>;
  createdAt: Date;
  status: RaceStatus;
  chats: ChatMessage[];
}