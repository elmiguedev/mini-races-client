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
  private constructor() { }
  public static getInstance() {
    if (!RaceSocketManager.instance) {
      RaceSocketManager.instance = new RaceSocketManager();
    }
    return RaceSocketManager.instance;
  }

  private socket: WebSocket | null = null;
  private raceDetailListeners: any[] = [];
  private chatMessageListeners: any[] = [];
  public raceDetail: RaceDetail | undefined;
  public chatMessages: Array<ChatMessage> = [];


  public connect(raceId: string, token: string) {
    this.socket = new WebSocket('ws://localhost:3000/races/' + raceId + "?token=" + token);
    this.socket.addEventListener("message", (event: any) => {
      this.handleMessage(event);
    });
  }

  private handleMessage(event: any) {
    const message = JSON.parse(event.data) as SocketMessage;
    switch (message.key) {
      case "player_chat":
        this.chatMessages.push(message.data);
        this.notifyChatMessageChange();
        break;

      case "race_status":
        this.raceDetail = message.data;
        this.notifyRaceDetailChange();
        break;

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
    this.socket?.close();
  }

  public addChatMessageListener(listener: any) {
    this.chatMessageListeners.push(listener);
  }

  public addRaceDetailListener(listener: any) {
    this.raceDetailListeners.push(listener);
  }

  public notifyChatMessageChange() {
    this.chatMessageListeners.forEach((listener) => {
      listener();
    });
  }

  public notifyRaceDetailChange() {
    this.raceDetailListeners.forEach((listener) => {
      listener();
    });
  }
}

export const useRaceSocket = () => {
  const raceDetail = ref<RaceDetail>();
  const chatMessages = ref<Array<ChatMessage>>([]);

  const connect = (raceId: string, token: string) => {
    RaceSocketManager.getInstance().connect(raceId, token);
    RaceSocketManager.getInstance().addChatMessageListener(() => {
      chatMessages.value = RaceSocketManager.getInstance().chatMessages;
    });

    RaceSocketManager.getInstance().addRaceDetailListener(() => {
      raceDetail.value = RaceSocketManager.getInstance().raceDetail;
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