import AnimalFactory from 'App/Models/Animal'
import Factory from '@ioc:Adonis/Lucid/Factory'

// @ts-ignore
export default Factory.define(AnimalFactory, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    description: faker.lorem.paragraph(1),
    type: faker.animal.type()
  }
}).build()
