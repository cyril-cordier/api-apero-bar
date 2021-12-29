import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from '../config/auth.config';

import { AuthenticationGuard } from './auth.guard';
import { AuthenticationService } from './auth.service';
import { AUTHENTICATION_STRATEGY_TOKEN } from './auth.strategy';
import { KeycloakAuthenticationStrategy } from './strategy/keycloak.strategy';

@Module({
  imports: [ConfigModule.forFeature(authConfig), HttpModule],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    {
      provide: AUTHENTICATION_STRATEGY_TOKEN,
      useClass: KeycloakAuthenticationStrategy,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
