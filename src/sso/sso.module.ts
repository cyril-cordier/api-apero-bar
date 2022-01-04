import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { AuthenticationModule } from 'src/auth/authentication.module'
// import { RedirectionModule } from 'src/redirection/redirection.module'
import { JWT_SIGN_SECRET } from './jwt.utils'
import { SsoController } from './sso.controller'
import { SsoService } from './sso.service'
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../../.env') });



@Module({
  imports: [
    //HttpModule,
    //PassportModule,
    // RedirectionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8760h' },
    }),
    TypeOrmModule.forFeature([])
  ],
  controllers: [SsoController],
  exports: [TypeOrmModule, JwtModule],
  providers: [SsoService],
})
export class SsoModule {}
