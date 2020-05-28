import { NextFunction, Request, Response, Router } from 'express'
import App from '../App'
import { CategoryRepository } from '../repositories/category'
import { ItemRepository } from '../repositories/item'
import { UserRepository } from '../repositories/user'

export class ItemsController {
    public path = '/items'
    public router = Router()
    public app: App
    public itemRepository: ItemRepository
    public categoryRepository: CategoryRepository
    public userRepository: UserRepository

    constructor() {
        this.itemRepository = new ItemRepository()
        this.categoryRepository = new CategoryRepository()
        this.userRepository = new UserRepository()
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.app.authorize, (req: Request, res: Response, next: NextFunction) => next())

        // Controller endpoints
        this.router.get(this.path, this.getAllItems)
        this.router.get(`${this.path}/:itemId`, this.getItem)
        this.router.get(`${this.path}/user/:userId`, this.getUserItems)
        this.router.post(this.path, this.createItem)
        this.router.patch(`${this.path}/:itemId`, this.updateItem)
        this.router.delete(`${this.path}/:itemId`, this.deleteItem)
    }

    getAllItems = async (req: Request, res: Response) => {
        const items = await this.itemRepository.findAll()
        return res.send(items)
    }

    getItem = async (req: Request, res: Response) => {
        const item = await this.itemRepository.find(Number(req.params.itemId))
        return res.send(item)
    }

    getUserItems = async (req: Request, res: Response) => {
        const items = await this.itemRepository.findUserItems(Number(req.params.userId))
        return res.send(items)
    }

    createItem = async (req: Request, res: Response) => {
        if (!req.body.categoryId) {
            return res.status(400).send('Missing categoryId field')
        }

        const user = await this.userRepository.find(req.app.get('userId'))
        const category = await this.categoryRepository.find(req.body.categoryId)
        if (!category) {
            return res.status(404).send('Category not found')
        }

        const item = this.itemRepository.create({ ...req.body, user, category })
        return res.send(item)
    }

    updateItem = async (req: Request, res: Response) => {
        const item = this.itemRepository.update(Number(req.params.itemId), req.body)

        return res.send(item)
    }

    deleteItem = async (req: Request, res: Response) => {
        const deleteResult = this.itemRepository.delete(Number(req.params.itemId))

        return res.send(deleteResult)
    }
}
