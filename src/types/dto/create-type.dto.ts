import { PickType } from '@nestjs/swagger';
import { Types } from '../entities/types.entity';

export class CreateTypesDto extends PickType(Types, [
  'name',
] as const) {}
