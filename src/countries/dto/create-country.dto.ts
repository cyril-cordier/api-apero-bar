import { PickType } from '@nestjs/swagger';
import { Countries } from '../entities/countries.entity';

export class CreateCountriesDto extends PickType(Countries, [
  'name',
] as const) {}
