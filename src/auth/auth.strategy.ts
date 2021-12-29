import { arrayBuffer } from "stream/consumers";

export const AUTHENTICATION_STRATEGY_TOKEN = 'AuthenticationStrategy';

export interface UserInfoResponse {
  role: any;
  rights: any;
  name: any;
  username: any;
}

export interface AuthenticationStrategy {
  authenticate(accessToken): Promise<UserInfoResponse>;
}
