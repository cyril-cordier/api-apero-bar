import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';

export class UpdateUsersDto extends PickType(Users, [
    'name',
    'admin',
    'rights',
    'username',
  ] as const) {}
