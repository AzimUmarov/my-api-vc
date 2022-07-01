import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AnimalFactory from "Database/factories/AnimalFactory";

export default class extends BaseSeeder {
  public async run () {
    await AnimalFactory.createMany(1000)
  }
}
