import type { ChatMessage } from "../domain/race/ChatMessage";
import type { RaceDetail } from "../domain/race/RaceDetail";

export interface SocketMessage {
  key: string;
  data: any;
}

export class RaceSocketManager {
  private static instance: RaceSocketManager;
  private constructor() {
    this.playerChatListeners = [];
    this.raceStatusListeners = [];
  }
  public static getInstance() {
    if (!RaceSocketManager.instance) {
      RaceSocketManager.instance = new RaceSocketManager();
    }
    return RaceSocketManager.instance;
  }

  private socket: WebSocket | null = null;
  private socketId: string | null = null;
  private playerChatListeners: any[] = [];
  private raceStatusListeners: any[] = [];

  public connect(raceId: string, token: string) {
    this.socket = new WebSocket('ws://localhost:3000/races/' + raceId + "?token=" + token);
    this.socket.addEventListener("message", (event: any) => {
      this.handleMessage(event);
    });
  }

  public getId() {
    return this.socketId;
  }

  public sendMessage(message: SocketMessage) {
    this.socket?.send(JSON.stringify(message));
  }

  public disconnect() {
    this.playerChatListeners = [];
    this.raceStatusListeners = [];
    this.socket?.close();
  }

  public addPlayerChatListener(listener: any) {
    this.playerChatListeners.push(listener);
  }

  public addRaceDetailListener(listener: any) {
    this.raceStatusListeners.push(listener);
  }


  private notifyPlayerChat(message: ChatMessage) {
    this.playerChatListeners.forEach((listener) => {
      listener(message);
    });
  }

  private notifyRaceStatus(race: RaceDetail) {
    this.raceStatusListeners.forEach((listener) => {
      listener(race);
    });
  }

  private handleMessage(event: any) {
    const message = JSON.parse(event.data) as SocketMessage;
    switch (message.key) {
      case "player_chat":
        this.notifyPlayerChat(message.data);
        break;

      case "race_status":
        this.notifyRaceStatus(message.data);
        break;

      case "socket_id": {
        this.socketId = message.data;
        break
      }

      default:
        break;
    }
  }


}
