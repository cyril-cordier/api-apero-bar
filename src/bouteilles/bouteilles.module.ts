import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bouteilles } from './entities/bouteilles.entity';
import { BouteillesService } from './bouteilles.service';
import { BouteillesController } from './bouteilles.controller';
import { CommonService } from '../common/common.service';
import { AuthenticationModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bouteilles]), AuthenticationModule],
  controllers: [BouteillesController],
  exports: [TypeOrmModule],
  providers: [BouteillesService, CommonService]
})
export class BouteillesModule {}