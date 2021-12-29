import { PartialType } from '@nestjs/swagger';
import { CreateTypesDto } from './create-type.dto';

export class UpdateTypesDto extends PartialType(CreateTypesDto) {}
