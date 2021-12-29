import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Types } from './entities/types.entity';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { CommonService } from '../common/common.service';
import { AuthenticationModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Types]), AuthenticationModule],
  controllers: [TypesController],
  exports: [TypeOrmModule],
  providers: [TypesService, CommonService]
})
export class TypesModule {}