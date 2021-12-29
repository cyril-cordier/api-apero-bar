import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { AuthenticationGuardAdmin } from 'src/auth/authAdm.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-category.dto';
import { UpdateCategoriesDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthenticationGuardAdmin)
  create(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.create(createCategoriesDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuardAdmin)
  update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
    return this.categoriesService.update(+id, updateCategoriesDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuardAdmin)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
