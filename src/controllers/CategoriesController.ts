import { NextFunction, Request, Response, Router } from 'express'
import App from '../App'
import { CategoryRepository } from '../repositories/category'
import { ItemRepository } from '../repositories/item'

export class CategoriesController {
    public path = '/items'
    public router = Router()
    public app: App
    public categoryRepository: CategoryRepository
    public itemRepository: ItemRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
        this.itemRepository = new ItemRepository()
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.app.authorize, (req: Request, res: Response, next: NextFunction) => next())

        // Controller endpoints
        this.router.get(this.path, this.getAllCategories)
        this.router.get(`${this.path}/:categoryId`, this.getCategory)
        this.router.get(`${this.path}/:categoryId/items`, this.getCategoryItems)
        this.router.post(this.path, this.createCategory)
        this.router.patch(`${this.path}/:categoryId`, this.updateCategory)
        this.router.delete(`${this.path}/:categoryId`, this.deleteCategory)
    }

    getAllCategories = async (req: Request, res: Response) => {
        const categories = await this.categoryRepository.findAll()
        return res.send(categories)
    }

    getCategory = async (req: Request, res: Response) => {
        const category = await this.categoryRepository.find(Number(req.params.categoryId))
        return res.send(category)
    }

    getCategoryItems = async (req: Request, res: Response) => {
        const categories = await this.itemRepository.findCategoryItems(Number(req.params.categoryId))
        return res.send(categories)
    }

    createCategory = async (req: Request, res: Response) => {
        const category = this.categoryRepository.create(req.body)
        return res.send(category)
    }

    updateCategory = async (req: Request, res: Response) => {
        const category = this.categoryRepository.update(Number(req.params.categoryId), req.body)
        return res.send(category)
    }

    deleteCategory = async (req: Request, res: Response) => {
        const deleteResult = this.categoryRepository.delete(Number(req.params.categoryId))
        return res.send(deleteResult)
    }
}
