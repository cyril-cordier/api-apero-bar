import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';

export class CreateUsersDto extends PickType(Users, [
  'name',
  'admin',
  'rights',
  'username',
  'password'
] as const) {}
