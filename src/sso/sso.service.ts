import { Body, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { Token } from './token.model'
import bcrypt = require("bcrypt")
import {LoginUserDto} from './dto/login-user.dto'
import { Username } from "./client.model";

@Injectable()
export class SsoService {
  constructor(
    private jwtService: JwtService,
    private manager: EntityManager,
  ) {}

  async findOneByUsername(login: LoginUserDto) {    
    const getUsers = await this.manager.query(`select * from "users" where UPPER(username)=UPPER('${login.username}')`)
    if(!getUsers.length){
      throw new NotFoundException('username not found')
    }

    if(!getUsers[0].password){
      throw new ForbiddenException('error with password')
    }

    const compare = bcrypt.compareSync(login.password, getUsers[0].password); // $ExpectType boolean
    if(!compare){
      throw new ForbiddenException('incorrect password')
    }

    if(!getUsers[0].id){
      throw new ForbiddenException('unable to retrieve user data')
    }

    const payloadToken:  Username = {
      "username": getUsers[0].username
    }

    return {data: getUsers[0],token: this.jwtService.sign(payloadToken)};
  }

  async getToken(user: any) {

    const payloadToken: Token = {
      "allowed-origins": JSON.parse(process.env.ALLOWED_ORIGIN),
      "role": user.admin ? 'admin' : 'user',
      "rights": user.rights,
      "name": `${user.name}`,
      "username": user.username,
      "userID": user.id,
      "app":process.env.APP
    }

    return {access_token : this.jwtService.sign(payloadToken)}
  }
}
