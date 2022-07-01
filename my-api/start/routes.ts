/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/docs', async ({ view }) => {
  const specUrl = 'your spec url'
  return view.render('swagger', { specUrl })
})

Route.group(() => {
  // swagger
  Route.get('/api/swagger', 'SwaggersController.index')

  Route.get('/animals', 'AnimalsController.index')
  Route.get('/animals/:id', 'AnimalsController.show')

  // auth
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')

  Route.group(() => {
    Route.post('/animals', 'AnimalsController.store')
    Route.put('/animals/:id', 'AnimalsController.update')
    Route.delete('/animals/:id', 'AnimalsController.destroy')

    Route.post('/logout', 'AuthController.logout')
  }).middleware('auth')
}).prefix('/api')
