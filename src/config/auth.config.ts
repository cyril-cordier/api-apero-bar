import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  remoteHost: process.env.KEYCLOAK_REMOTE_HOST || 'http://localhost:8080',
  realm: process.env.KEYCLOAK_REALM || '',
}));
