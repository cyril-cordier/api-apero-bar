import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { AuthenticationGuardAdmin } from 'src/auth/authAdm.guard';
import { BouteillesService } from './bouteilles.service';
import { CreateBouteillesDto } from './dto/create-bouteilles.dto';
import { UpdateBouteillesDto } from './dto/update-bouteilles.dto';

@Controller('bouteilles')
@ApiTags('Bouteilles')
@ApiBearerAuth()
export class BouteillesController {
  constructor(private readonly bouteillesService: BouteillesService) {}

  @Post()
  @UseGuards(AuthenticationGuardAdmin)
  create(@Body() createBouteillesDto: CreateBouteillesDto) {
    return this.bouteillesService.create(createBouteillesDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.bouteillesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.bouteillesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuardAdmin)
  update(@Param('id') id: string, @Body() updateBouteillesDto: UpdateBouteillesDto) {
    return this.bouteillesService.update(+id, updateBouteillesDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuardAdmin)
  remove(@Param('id') id: string) {
    return this.bouteillesService.remove(+id);
  }
}
