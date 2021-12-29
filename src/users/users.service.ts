import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Users } from './entities/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
const bcrypt = require("bcrypt");


@Injectable()
export class UsersService {
  constructor(
    private common: CommonService,
    private manager: EntityManager,
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>,
  ) {}
  async create(createUsersDto: CreateUsersDto) {
    const cryptPass = await bcrypt.hash(createUsersDto.password, 10);

    const UsersCreate = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values([
      {
        name: createUsersDto.name ? createUsersDto.name : null,
        admin: createUsersDto.admin ? createUsersDto.admin : false,
        rights: createUsersDto.rights ? createUsersDto.rights : false,
        username: createUsersDto.username ? createUsersDto.username : null,
        password: createUsersDto.password ? cryptPass : null,
      },
    ])
    .execute();
    return UsersCreate.raw[0];
  }

  async findAll() {
    const Users = await this.manager.query(`select * from users`);

    return Users;
  }

  async findOne(id: number) {
    const user = await this.manager.query(`select * from users where id = $1`, [id]);
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.manager.query(`select * from users where username = $1`, [username]);
    return user;
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    const userExist:any = this.findOneByUsername(updateUsersDto.username)

      const user = await this.manager.query(`update users set 
      name = $1, 
      admin = $2, 
      rights = $3, 
      username = $4
      where id = $5
      returning *`, [updateUsersDto.name, updateUsersDto.admin, updateUsersDto.rights, updateUsersDto.username, id]);
      return user[0][0];  
    }
  
  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    console.log("🚀 ~ file: users.service.ts ~ line 61 ~ UsersService ~ changePassword ~ password", changePasswordDto.password)
    const cryptPass = await bcrypt.hash(changePasswordDto.password, 10);
    const changeUserPassword = await this.manager.query(
      `UPDATE "users" set password='${cryptPass}'
      where id=${id} returning *`)
    if(changeUserPassword){
      return "Password successfully changed";
    }
  }

  async remove(id: number) {
    const user = await this.manager.query(`delete from users where id = $1`, [id]);
    return 'user deleted';
  }
}
