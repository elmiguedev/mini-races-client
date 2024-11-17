import type { ErrorMessage } from "@/core/domain/error/ErrorMessage";
import { RaceSocketManager } from "@/core/services/RaceSocketManager";

export interface SubscribeErrorParams {
  callback: (message: ErrorMessage) => void;
}

export const SubscribeError = ({ callback }: SubscribeErrorParams) => {
  RaceSocketManager.getInstance().addErrorListener(callback);
}