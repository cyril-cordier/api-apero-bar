import { Controller, Get, Param, Req,Post, Body, Delete, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { Request } from 'express'
// import { AuthenticationGuard } from 'src/auth/authentication.guard'
// import { HttpVerb } from '../helpers/httpverb.helper'
// import { RedirectionService } from '../redirection/redirection.service'
import { SsoService } from './sso.service'
import {LoginUserDto} from './dto/login-user.dto'

@Controller('auth')
@ApiTags('Auth')
//@UseGuards(AuthenticationGuard)
//@ApiBearerAuth()
export class SsoController {
  constructor(private ssoService: SsoService) {}

  @Post('') 
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.ssoService.findOneByUsername(loginUserDto)
    const getToken = await this.ssoService.getToken(user.data)
    return getToken
  }
}