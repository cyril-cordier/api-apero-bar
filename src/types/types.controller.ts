import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { TypesService } from './types.service';
import { CreateTypesDto } from './dto/create-type.dto';
import { UpdateTypesDto } from './dto/update-type.dto';
import { AuthenticationGuardAdmin } from 'src/auth/authAdm.guard';

@Controller('types')
@ApiTags('Types')
@ApiBearerAuth()
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @UseGuards(AuthenticationGuardAdmin)
  create(@Body() createTypesDto: CreateTypesDto) {
    return this.typesService.create(createTypesDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuardAdmin)
  update(@Param('id') id: string, @Body() updateTypesDto: UpdateTypesDto) {
    return this.typesService.update(+id, updateTypesDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuardAdmin)
  remove(@Param('id') id: string) {
    return this.typesService.remove(+id);
  }
}
