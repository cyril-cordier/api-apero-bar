import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesDto } from './create-category.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {}
