import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CommonService } from '../common/common.service';
import { AuthenticationModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), AuthenticationModule],
  controllers: [CategoriesController],
  exports: [TypeOrmModule],
  providers: [CategoriesService, CommonService]
})
export class CategoriesModule {}