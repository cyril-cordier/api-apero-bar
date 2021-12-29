import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  AUTHENTICATION_STRATEGY_TOKEN,
  AuthenticationStrategy,
} from './auth.strategy';
const jwt_decode = require('jwt-decode');

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
      
      const jwt = jwt_decode(accessToken)
      const now = new Date().getTime()/1000
      
      if (now < jwt.exp && jwt.rights && jwt.app === process.env.APP && (jwt.role == "admin" || jwt.role == "user")) {
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
      
      const jwt = jwt_decode(accessToken)
      const now = new Date().getTime()/1000

      if (now < jwt.exp && jwt.rights && jwt.role == "admin" && jwt.app === process.env.APP) {
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
