import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';

import { AuthenticationService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const header = request.header('Authorization');
    if (!header) {
      throw new UnauthorizedException(
        'Authorization: Bearer <token> header missing',
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Authorization: Bearer <token> header invalid',
      );
    }

    const accessToken = parts[1];
    try {
      // Store the token on the request object to retrieve it from the controllers to use for api ref call
      await this.authenticationService.authenticate(accessToken);
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
