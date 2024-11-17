import type { ErrorMessage } from "../domain/error/ErrorMessage";
import type { ChatMessage } from "../domain/race/ChatMessage";
import type { RaceDetail } from "../domain/race/RaceDetail";
import { SocketMessageKeys } from "../utils/SocketMessageKeys";

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
  private errorListener: any[] = [];

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

  public addErrorListener(listener: any) {
    this.errorListener.push(listener);
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

  private notifyError(error: ErrorMessage) {
    this.errorListener.forEach((listener) => {
      listener(error);
    })
  }

  private handleMessage(event: any) {
    const message = JSON.parse(event.data) as SocketMessage;
    switch (message.key) {
      case SocketMessageKeys.PLAYER_CHAT:
        this.notifyPlayerChat(message.data);
        break;

      case SocketMessageKeys.RACE_STATUS:
        this.notifyRaceStatus(message.data);
        break;

      case SocketMessageKeys.ERROR:
        this.notifyError(message.data);
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
