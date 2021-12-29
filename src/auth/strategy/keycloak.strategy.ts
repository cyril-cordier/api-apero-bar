import { HttpService, Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationStrategy,
  UserInfoResponse,
} from '../auth.strategy';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class KeycloakAuthenticationStrategy implements AuthenticationStrategy {
  constructor(
    @Inject(authConfig.KEY)
    private auth: ConfigType<typeof authConfig>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(accessToken: string): Promise<UserInfoResponse> {
    const url = `${this.auth.remoteHost}/auth/realms/${this.auth.realm}/protocol/openid-connect/userinfo`;

    const response = await this.httpService
      .get<UserInfoResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();

    return response.data;
  }
}
