import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Types } from './entities/types.entity';
import { CreateTypesDto } from './dto/create-type.dto';
import { UpdateTypesDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(
    private common: CommonService,
    private manager: EntityManager,
    @InjectRepository(Types)
    private typesRepository: Repository<Types>,
  ) {}
  async create(createTypesDto: CreateTypesDto) {
    const typesMemberCreate = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Types)
    .values([
      {
        name: createTypesDto.name ? createTypesDto.name : null,
      },
    ])
    .execute();
    return typesMemberCreate.raw[0];
  }

  async findAll() {
    const types = await this.manager.query(`select * from types`);

    return types;
  }

  async findOne(id: number) {
    const type = await this.manager.query(`select * from types WHERE id=$1`, [id]);
    if (!type) {
      throw new NotFoundException('type not found')
    }
    return type;
  }

  async update(id: number, updateTypesDto: UpdateTypesDto) {
    await this.typesRepository.findOne(id)

    const name = updateTypesDto.name ? updateTypesDto.name : null;
    await this.manager.query(`UPDATE types SET name = $1 WHERE id = $2`, [name, id]);

    const updatedType = await this.typesRepository.findOne(id)


    return updatedType;
  }

  async remove(id: number) {
    const type = await this.typesRepository.findOne(id)

    const exec = await this.manager.query(`DELETE FROM types WHERE id=$1`, [id])

    return 'type deleted'
  }
}
