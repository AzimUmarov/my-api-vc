import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from "App/Models/Animal";
import Cache from "@ioc:Kaperskyguru/Adonis-Cache";

export default class AnimalsController {
  public async index ({ request }: HttpContextContract) {
    const cashedAnimals = await Cache.remember('animals', 10, async function() {
      const { page = 1, perPage = 20 } = request.get()
      const animals = await Animal.query().paginate(page, perPage)
      return animals
    })
    return cashedAnimals
  }

  public async show ({ params }: HttpContextContract) {
    const animal = await Cache.remember('animal', 10, async function() {
      const animal = await Animal.find(params.id)
      if (!animal) {
        throw new Error('Animal not found')
      }
      return animal
    })
    return animal
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['name', 'description', 'type'])
    const animal = await Animal.create(data)
    return animal
  }

  public async update ({ params, request }: HttpContextContract) {
    const animal = await Animal.find(params.id)
    if (!animal) {
      throw new Error('Animal not found')
    }
    const data = request.only(['name', 'description', 'type'])
    animal.fill(data)
    await animal.save()
    return animal
  }

  public async delete ({ params }: HttpContextContract) {
    const animal = await Animal.find(params.id)
    if (!animal) {
      throw new Error('Animal not found')
    }
    await animal.delete()
    return {
      message: 'Deleted successfully'
    }
  }
}
