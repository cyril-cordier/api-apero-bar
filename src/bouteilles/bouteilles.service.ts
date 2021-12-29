import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Bouteilles } from './entities/bouteilles.entity';
import { CreateBouteillesDto } from './dto/create-bouteilles.dto';
import { UpdateBouteillesDto } from './dto/update-bouteilles.dto';

@Injectable()
export class BouteillesService {
  constructor(
    private common: CommonService,
    private manager: EntityManager,
    @InjectRepository(Bouteilles)
    private bouteillesRepository: Repository<Bouteilles>,
  ) {}
  async create(createBouteillesDto: CreateBouteillesDto) {
    const bouteillesCreate = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Bouteilles)
    .values([
      {
        categoryId: createBouteillesDto.categoryId ? createBouteillesDto.categoryId : null,
        typeId: createBouteillesDto.typeId ? createBouteillesDto.typeId : null,
        name: createBouteillesDto.name ? createBouteillesDto.name : null,
        vintage: createBouteillesDto.vintage ? createBouteillesDto.vintage : null,
        details: createBouteillesDto.details ? createBouteillesDto.details : null,
        image: createBouteillesDto.image ? createBouteillesDto.image : null,
        countryId: createBouteillesDto.countryId ? createBouteillesDto.countryId : null,
        volume: createBouteillesDto.volume ? createBouteillesDto.volume : null,
        alcohol: createBouteillesDto.alcohol ? createBouteillesDto.alcohol : null,
        quantity: createBouteillesDto.quantity ? createBouteillesDto.quantity : null,
        display: createBouteillesDto.display ? createBouteillesDto.display : true,
        toBuy: createBouteillesDto.toBuy ? createBouteillesDto.toBuy : false,
      },
    ])
    .execute();
    return bouteillesCreate.raw[0];
  }

  async findAll() {
    const bouteilles = await this.manager.query(
      `select b.id, b.name as name, vintage, details, image, alcohol, quantity, display, "toBuy", volume, 
      c.name as country, 
      cat.name as category, 
      t.name as type
      from bouteilles b
      join countries c on "countryId" = c.id
      join categories cat on "categoryId" = cat.id
      join types t on "typeId" = t.id
      `);

    return bouteilles;
  }

  async findOne(id: number) {
    const bouteille = await this.manager.query(
      `select b.id, b.name as name, vintage, details, image, alcohol, quantity, display, "toBuy", volume, 
      c.name as country, 
      cat.name as category, 
      t.name as type
      from bouteilles b
      join countries c on "countryId" = c.id
      join categories cat on "categoryId" = cat.id
      join types t on "typeId" = t.id
      where b.id = $1
      `, [id]);

      if (!bouteille[0]) {
        throw new NotFoundException('bottle not found')
      } else {
        return bouteille[0];
      }

  }

  async update(id: number, updateBouteillesDto: UpdateBouteillesDto) {
    const bouteille = await this.bouteillesRepository.findOne(id)
    if (!bouteille) {
      throw new NotFoundException('bottle not found')
    }
 
    const categoryId = updateBouteillesDto.categoryId ? updateBouteillesDto.categoryId : null;
    const typeId = updateBouteillesDto.typeId ? updateBouteillesDto.typeId : null;
    const name = updateBouteillesDto.name ? updateBouteillesDto.name : null;
    const vintage = updateBouteillesDto.vintage ? updateBouteillesDto.vintage : null;
    const details = updateBouteillesDto.details ? updateBouteillesDto.details : null;
    const image = updateBouteillesDto.image ? updateBouteillesDto.image : null;
    const countryId = updateBouteillesDto.countryId ? updateBouteillesDto.countryId : null;
    const volume = updateBouteillesDto.volume ? updateBouteillesDto.volume : null;
    const alcohol = updateBouteillesDto.alcohol ? updateBouteillesDto.alcohol : null;
    const quantity = updateBouteillesDto.quantity ? updateBouteillesDto.quantity : null;
    const display = updateBouteillesDto.display ? updateBouteillesDto.display : true;
    const toBuy = updateBouteillesDto.toBuy ? updateBouteillesDto.toBuy : false;

    const updateBouteille = await this.manager.query(
      `UPDATE bouteilles SET
        "categoryId" = $1,
        "typeId" = $2,
        name = $3,
        vintage = $4,
        details = $5,
        image = $6,
        "countryId" = $7,
        volume = $8,
        alcohol = $9,
        quantity = $10,
        display = $11,
        "toBuy" = $12
        WHERE id = $13
      `, [categoryId,
        typeId,
        name,
        vintage,
        details,
        image,
        countryId,
        volume,
        alcohol,
        quantity,
        display,
        toBuy, id] );

    const updatedBouteille = await this.bouteillesRepository.findOne(id)


    return updatedBouteille;

  }

  async remove(id: number) {
    await this.bouteillesRepository.findOne(id)
    await this.manager.query(`DELETE FROM bouteilles WHERE id=$1`, [id])

    return 'bottle deleted'

  }
}
