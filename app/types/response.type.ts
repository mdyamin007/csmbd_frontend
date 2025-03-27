import type { User } from "./data.type";

export type LoginResType = {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
};
