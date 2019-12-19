import * as express from 'express';
import { Category } from '../models/Category/Category';
import App from '../App';



class CategoriesController {
    public path = '/category';
    public router: express.Router = express.Router();
    public app: App;

    constructor() {
        
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.get(this.path, this.app.authorize, this.getAllCategories);
        this.router.get(this.path + '/:id', this.app.authorize, this.getCategory);

        this.router.post(this.path, this.app.authorize, this.createCategory);

        this.router.put(this.path + '/:id', this.app.authorize, this.updateCategory);

        this.router.delete(this.path + '/:id', this.app.authorize, this.deleteCategory);
    }

    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction) {
        const params = {id: req.url.split('/')[2]};
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) { return res.status(400).send({ message: 'Id is required'}); }
                break;
            case 'POST':
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty"}); }
                break;
            case 'PUT':
                if (!params.id) { return res.status(400).send({ message: 'Id is required'}); }
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty"}); }
                break;
        }
        next();
    }

    public async getAllCategories (req: express.Request, res: express.Response) {
        let categories = await Category.find({relations: ['items']});
        const simplifiedCategories = categories.map((category) => {
            let simpleCategory = {
                id: category.id,
                name: category.name,
                image_url: category.image_url,
                items: category.items.length,
            }
            return simpleCategory;
        })
        return res.send(simplifiedCategories);
    }

    public async getCategory (req: express.Request, res: express.Response) {
        const category =  await Category.findOne(req.params.id, {relations: ['items']});
        return res.send(category);
    }

    public async createCategory (req: express.Request, res: express.Response) {
        const category = await Category.create(req.body);
        category.save();
        return res.send(category);
    }

    public async updateCategory(req: express.Request, res: express.Response) {
        const category = await Category.findOne(req.params.id);
        if (category !== undefined) {
            await Category.update(req.params.id, req.body);
            return res.status(200).send({ message: 'Category updated correctly'});
        }

        return res.status(404).send({ message: 'Category not found'});
    }

    public async deleteCategory(req: express.Request, res: express.Response) {
        Category.delete(req.params.id);
        return res.status(200).send({ message: 'Category deleted successfully'});
    }
}

export default CategoriesController;