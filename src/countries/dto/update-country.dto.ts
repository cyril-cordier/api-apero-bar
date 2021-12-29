import { PartialType } from '@nestjs/swagger';
import { CreateCountriesDto } from './create-country.dto';

export class UpdateCountriesDto extends PartialType(CreateCountriesDto) {}
