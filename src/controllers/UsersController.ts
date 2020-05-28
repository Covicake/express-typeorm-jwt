import { NextFunction, Request, Response, Router } from 'express'
import App from '../App'
import { UserRepository } from '../repositories/user'

export class UsersController {
    public path = '/users'
    public router = Router()
    public app: App
    public userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.app.authorize, (req: Request, res: Response, next: NextFunction) => next())

        // Controller endpoints
        this.router.get(this.path, this.getAllUsers)
        this.router.get(`${this.path}/:userId`, this.getUser)
        this.router.post(this.path, this.createUser)
        this.router.patch(`${this.path}/:userId`, this.updateUser)
        this.router.delete(`${this.path}/:userId`, this.deleteUser)
    }

    getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userRepository.findAll()
        return res.send(users)
    }

    getUser = async (req: Request, res: Response) => {
        const user = await this.userRepository.find(Number(req.params.userId))
        return res.send(user)
    }

    createUser = (req: Request, res: Response) => {
        const user = this.userRepository.create(req.body)
        return res.send(user)
    }

    updateUser = async (req: Request, res: Response) => {
        const user = await this.userRepository.update(Number(req.params.userId), req.body)
        return res.send(user)
    }

    deleteUser = async (req: Request, res: Response) => {
        const deleteResult = await this.userRepository.delete(Number(req.params.userId))

        return res.send(deleteResult)
    }
}
