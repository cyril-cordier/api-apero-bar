import { PartialType } from '@nestjs/swagger';
import { CreateBouteillesDto } from './create-bouteilles.dto';

export class UpdateBouteillesDto extends PartialType(CreateBouteillesDto) {}
