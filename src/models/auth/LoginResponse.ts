import type { UserSession } from "./UserSession";

export interface LoginResponse {
  token: string;
  user: UserSession;
}