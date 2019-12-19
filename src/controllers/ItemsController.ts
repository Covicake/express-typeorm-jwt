import * as express from 'express';
import { Item } from '../models/Item/Item';
import App from '../App';



class ItemsController {
    public path = '/item';
    public router: express.Router = express.Router();
    public app: App;

    constructor() {
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.get(this.path, this.app.authorize, this.getAllItems);
        this.router.get(this.path + '/latest', this.app.authorize, this.getLatestItems)
        this.router.get(this.path + '/:id', this.app.authorize, this.getItem);

        this.router.post(this.path, this.app.authorize, this.createItem);

        this.router.put(this.path + '/:id', this.app.authorize, this.updateItem);

        this.router.delete(this.path + '/:id', this.app.authorize, this.deleteItem);
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

    public async getAllItems (req: express.Request, res: express.Response) {
        const items = await Item.find();
        return res.send(items);
    }

    public async getLatestItems (req: express.Request, res: express.Response) {
        const items = await Item.find({take: 9});
        return res.send(items);
    }

    public async getItem (req: express.Request, res: express.Response) {
        const item =  await Item.findOne(req.params.id);
        return res.send(item);
    }

    public async createItem (req: express.Request, res: express.Response) {
        const item = Item.create(req.body);
        item.save();
        return res.send(item);
    }

    public async updateItem(req: express.Request, res: express.Response) {
        const item = await Item.findOne(req.params.id);
        if (item !== undefined) {
            await Item.update(req.params.id, req.body);
            return res.status(200).send({ message: 'Item updated correctly'});
        }

        return res.status(404).send({ message: 'Item not found'});
    }

    public async deleteItem(req: express.Request, res: express.Response) {
        Item.delete(req.params.id);
        return res.status(200).send({ message: 'Item deleted successfully'});
    }
}

export default ItemsController;