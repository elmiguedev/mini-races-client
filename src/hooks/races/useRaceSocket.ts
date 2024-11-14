import { computed, ref } from "vue";
import type { ChatMessage } from "../../models/race/ChatMessage";
import { useAuth } from "../auth/useAuth";
import type { RaceDetail } from "@/models/race/RaceDetail";

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

  private sendMessage(message: SocketMessage) {
    this.socket?.send(JSON.stringify(message));
  }

  public sendChatMessage(message: string) {
    this.sendMessage({
      key: "player_chat", data: {
        message
      }
    });
  }

  public sendPlayerReady() {
    this.sendMessage({ key: "player_ready", data: {} });
  }

  public disconnect() {
    this.playerChatListeners = [];
    this.raceStatusListeners = [];
    this.socket?.close();
  }

  public sendPlayerInGame() {
    this.sendMessage({ key: "player_in_race", data: {} });
  }

  public sendPlayerMove(moves: any) {
    this.sendMessage({ key: "player_move", data: moves });
  }

  public sendPlayerRunning() {
    this.sendMessage({ key: "player_running", data: {} });
  }

  public addPlayerChatListener(listener: any) {
    this.playerChatListeners.push(listener);
  }

  public addRaceDetailListener(listener: any) {
    this.raceStatusListeners.push(listener);
  }

  public notifyPlayerChat(message: ChatMessage) {
    this.playerChatListeners.forEach((listener) => {
      listener(message);
    });
  }

  public notifyRaceStatus(race: RaceDetail) {
    this.raceStatusListeners.forEach((listener) => {
      listener(race);
    });
  }
}

export const useRaceSocket = () => {
  const raceDetail = ref<RaceDetail>();
  const chatMessages = ref<Array<ChatMessage>>([]);

  const connect = (raceId: string, token: string) => {
    RaceSocketManager.getInstance().connect(raceId, token);
    RaceSocketManager.getInstance().addPlayerChatListener((message: ChatMessage) => {
      chatMessages.value.push(message);
    });

    RaceSocketManager.getInstance().addRaceDetailListener((data: RaceDetail) => {
      raceDetail.value = data;
    });
  }

  const disconnect = () => {
    RaceSocketManager.getInstance().disconnect();
  }

  const sendChatMessage = (message: string) => {
    RaceSocketManager.getInstance().sendChatMessage(message);
  }

  const sendPlayerReady = () => {
    RaceSocketManager.getInstance().sendPlayerReady();
  }


  return {
    connect,
    disconnect,
    sendChatMessage,
    sendPlayerReady,
    raceDetail,
    chatMessages,

  }
}