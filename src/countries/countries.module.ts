import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from './entities/countries.entity';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CommonService } from '../common/common.service';
import { AuthenticationModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Countries]), AuthenticationModule],
  controllers: [CountriesController],
  exports: [TypeOrmModule],
  providers: [CountriesService, CommonService]
})
export class CountriesModule {}