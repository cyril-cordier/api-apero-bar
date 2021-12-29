import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonService } from '../common/common.service';
import { AuthenticationModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthenticationModule],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [UsersService, CommonService]
})
export class UsersModule {}