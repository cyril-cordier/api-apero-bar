import { PickType } from '@nestjs/swagger';
import { Bouteilles } from '../entities/bouteilles.entity';

export class CreateBouteillesDto extends PickType(Bouteilles, [
  'categoryId',
  'typeId',
  'name',
  'vintage',
  'details',
  'image',
  'countryId',
  'volume',
  'alcohol',
  'quantity',
  'display',
  'toBuy',
] as const) {}
