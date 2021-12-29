import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(private manager: EntityManager) {}

  async categoriesList() {
    return await this.manager.query(`select * from categories`);
  }

  async typesList() {
    return await this.manager.query(`select * from types`);
  }

  async countriesList() {
    return await this.manager.query(`select * from countries`);
  }

  async usersList() {
    return await this.manager.query(`select * from users`);
  }

 async bottlesList() {
   return await this.manager.query(`select * from bouteilles`);
 } 

  async getCategory(categoryId: number) {
    const get_category = await this.manager.query(
      `select * from categories
      where id = ${categoryId}`,
    );
    return get_category;
  }

  async getCountry(countryId: number) {
    const get_country = await this.manager.query(
      `select * from countries
      where id = ${countryId}`,
    );
    return get_country;
  }
  
  async getType(typeId: number) {
    const get_type = await this.manager.query(
      `select * from types
      where id = ${typeId}`,
    );
    return get_type;
  }

  async getUser(userId: number) {
    const get_user = await this.manager.query(
      `select * from users
      where id = ${userId}`,
    );
    return get_user;
  }

  async getBottle(bottleId: number) {
    const get_bottle = await this.manager.query(
      `select * from bouteilles b
      join categories cat on cat.id = b.categoryId
      join countries c on c.id = b.countryId
      join types t on t.id = b.typeId
      where b.id = $1,`,[bottleId]
    );
    return get_bottle;
  }
}
