import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { Countries } from './entities/countries.entity';
import { CreateCountriesDto } from './dto/create-country.dto';
import { UpdateCountriesDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    private common: CommonService,
    private manager: EntityManager,
    @InjectRepository(Countries)
    private countriesRepository: Repository<Countries>,
  ) {}
  async create(createCountriesDto: CreateCountriesDto) {
    const countriesMemberCreate = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Countries)
    .values([
      {
        name: createCountriesDto.name ? createCountriesDto.name : null,
      },
    ])
    .execute();
    return countriesMemberCreate.raw[0];
  }

  async findAll() {
    const countries = await this.manager.query(`select * from countries`);

    return countries;
  }

  async findOne(id: number) {
    const country = await this.manager.query(`select * from countries WHERE id=$1`, [id]);
    if (!country) {
      throw new NotFoundException('country not found')
    }
    return country;
  }

  async update(id: number, updateCountriesDto: UpdateCountriesDto) {
    await this.countriesRepository.findOne(id)

    const name = updateCountriesDto.name ? updateCountriesDto.name : null;
    await this.manager.query(`UPDATE countries SET name = $1 WHERE id = $2`, [name, id]);

    const updatedCountry = await this.countriesRepository.findOne(id)


    return updatedCountry;
  }

  async remove(id: number) {
    const country = await this.countriesRepository.findOne(id)

    const exec = await this.manager.query(`DELETE FROM countries WHERE id=$1`, [id])

    return 'country deleted'
  }
}
