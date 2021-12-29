import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { AuthenticationGuardAdmin } from 'src/auth/authAdm.guard';
import { CountriesService } from './countries.service';
import { CreateCountriesDto } from './dto/create-country.dto';
import { UpdateCountriesDto } from './dto/update-country.dto';

@Controller('countries')
@ApiTags('Countries')
@ApiBearerAuth()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @UseGuards(AuthenticationGuardAdmin)
  create(@Body() createCountriesDto: CreateCountriesDto) {
    return this.countriesService.create(createCountriesDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuardAdmin)
  update(@Param('id') id: string, @Body() updateCountriesDto: UpdateCountriesDto) {
    return this.countriesService.update(+id, updateCountriesDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuardAdmin)
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
