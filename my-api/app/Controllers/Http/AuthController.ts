import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async login ({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({}, [
        rules.required(),
        rules.email(),
      ]),
      password: schema.string({}, [
        rules.required(),
      ]),
    })
    const data = await request.validate({ schema: userSchema })
    try {
      if (await auth.use('api').attempt(data.email, data.password)) {
        const user = await User.findBy('email', data.email)
        const token = await auth.use('api').generate(user)
        return response.status(200).json({ token })
      }
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async register ({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required()]),
      email: schema.string({ trim: true }, [rules.required(), rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({ trim: true }, [rules.required()]),
    })
    const data = await request.validate({ schema: userSchema })
    await User.create(data)
    try {
      if (await auth.use('api').attempt(data.email, data.password)) {
        const user = await User.findBy('email', data.email)
        const token = await auth.use('api').generate(user)
        return response.status(200).json({ token })
      }
    } catch (e) {
      return response.badRequest({ error: e.message })
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.noContent()
  }
}
