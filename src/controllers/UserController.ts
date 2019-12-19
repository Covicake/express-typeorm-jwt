import * as express from 'express';
import { User } from '../models/User/User';
import App from '../App';

class ItemsController {
    public path = '/user';
    public router: express.Router = express.Router();
    public app: App;

    constructor() {
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.get(this.path, this.app.authorize, this.getAllUsers);
        this.router.get(this.path + '/:id', this.app.authorize, this.getUser);

        this.router.post(this.path + '/create', this.app.authorize, this.createUser);
        this.router.post(this.path+'/createAdmin', this.createAdminUser);
        this.router.post(this.path + '/login', this.login);

        this.router.put(this.path + '/:id', this.app.authorize, this.updateUser);

        this.router.delete(this.path + '/:id', this.app.authorize, this.deleteUser);
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

    public async getAllUsers (req: express.Request, res: express.Response) {
        const users = await User.find({relations: ['items']});
        if (!users) res.sendStatus(404);

        let slimUsers = User.removePropertiesFrom(users);
        return res.send(slimUsers);
        
    }

    public async getUser (req: express.Request, res: express.Response) {
        const user =  await User.findOne(req.params.id, {relations: ['items']});
        if (!user) return res.sendStatus(404);
        
        let slimUser = User.removePropertiesFrom([user]);
        return res.send(slimUser[0]);
    }

    public async createUser (req: express.Request, res: express.Response) {
        const user = User.create(req.body);
        return res.send(user);
    }

    public async createAdminUser (req: express.Request, res: express.Response) {
        const users = await User.find();
        if (users.length > 0) return res.sendStatus(404);
        
        const user = User.create(req.body);
        user.save();
        return res.sendStatus(200);
    }

    public async login (req: express.Request, res: express.Response) {
        let user = await User.login(req);
        if (!user)
        {
            return res.sendStatus(403);
        }

        return res.send(user);
    }

    public async updateUser(req: express.Request, res: express.Response) {
        const user = await User.findOne(req.params.id);
        if (user !== undefined) {
            await User.update(req.params.id, req.body);
            return res.status(200).send({ message: 'User updated correctly'});
        }

        return res.status(404).send({ message: 'User not found'});
    }

    public async deleteUser(req: express.Request, res: express.Response) {
        User.delete(req.params.id);
        return res.status(200).send({ message: 'User deleted successfully'});
    }
}

export default ItemsController;