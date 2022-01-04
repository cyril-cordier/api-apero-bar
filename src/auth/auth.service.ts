import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  AUTHENTICATION_STRATEGY_TOKEN,
  AuthenticationStrategy,
} from './auth.strategy';
const jwt_decode = require('jwt-decode');
import * as jwt from 'jsonwebtoken';
import { JWT_SIGN_SECRET } from "src/sso/jwt.utils";

interface JwToken {
  'allowed-origins': string[];
  role: string;
  rights: boolean;
  name: string;
  username: string;
  userID: number;
  app: string;
  exp: number;
}

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);

  constructor(
    @Inject(AUTHENTICATION_STRATEGY_TOKEN)
    private readonly strategy: AuthenticationStrategy,
  ) {}

  async authenticate(accessToken: string) {

    try {
      jwt.verify(accessToken, process.env.JWT_SECRET)
      const jwtoken:JwToken = jwt_decode(accessToken)
      const now = new Date().getTime()/1000
      
      if (now < jwtoken.exp && jwtoken.rights && jwtoken.app === process.env.APP && (jwtoken.role == "admin" || jwtoken.role == "user")) {
        return true;
      } else {
        throw new Error();
      }

    } catch (e) {
      this.logger.error(e.message, e.stackTrace);
      throw new AuthenticationError(e.message);
    }
  }
  async authenticateAdmin(accessToken: string) {

    try {
      jwt.verify(accessToken, process.env.JWT_SECRET)
      const jwtoken:JwToken = jwt_decode(accessToken)

      const now = new Date().getTime()/1000

      if (now < jwtoken.exp && jwtoken.rights && jwtoken.role == "admin" && jwtoken.app === process.env.APP) {
        return true;
      } else {
        throw new Error();
      }

    } catch (e) {
      this.logger.error(e.message, e.stackTrace);
      throw new AuthenticationError(e.message);
    }
  }
}
