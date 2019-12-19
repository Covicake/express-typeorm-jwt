import App from './App';
import key from "./config";
import CategoriesController from "./controllers/CategoriesController";
import ItemsController from "./controllers/ItemsController";
import UserController from "./controllers/UserController";

const controllers = [new CategoriesController(), new ItemsController(), new UserController()];

const PORT = Number(process.env.PORT) || 3000;
const app = new App(controllers, PORT);
app.app.set('key', key.key);
app.listen();

export default app;