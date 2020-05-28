import App from './App'
import { config } from './config'
import { AuthController, CategoriesController, ItemsController, UsersController } from './controllers'

const controllers = [UsersController, ItemsController, CategoriesController, AuthController]

const PORT = Number(process.env.PORT) || 3000
const app = new App(controllers, PORT)

app.app.set('key', config.key)
app.listen()

export default app
