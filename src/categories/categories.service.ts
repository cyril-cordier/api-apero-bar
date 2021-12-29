import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-category.dto';
import { UpdateCategoriesDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private common: CommonService,
    private manager: EntityManager,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async create(createCategoriesDto: CreateCategoriesDto) {
    const categoriesMemberCreate = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Categories)
    .values([
      {
        name: createCategoriesDto.name ? createCategoriesDto.name : null,
      },
    ])
    .execute();
    return categoriesMemberCreate.raw[0];
  }

  async findAll() {
    const categories = await this.manager.query(`select * from categories`);

    return categories;
  }

  async findOne(id: number) {
    const category = await this.manager.query(`select * from categories WHERE id=$1`, [id]);
    if (!category) {
      throw new NotFoundException('category not found')
    }
    return category;
  }

  async update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
    await this.categoriesRepository.findOne(id)

    const name = updateCategoriesDto.name ? updateCategoriesDto.name : null;
    await this.manager.query(`UPDATE categories SET name = $1 WHERE id = $2`, [name, id]);

    const updatedCategory = await this.categoriesRepository.findOne(id)


    return updatedCategory;
  }

  async remove(id: number) {
    const category = await this.categoriesRepository.findOne(id)

    const exec = await this.manager.query(`DELETE FROM categories WHERE id=$1`, [id])

    return 'category deleted'
  }
}
