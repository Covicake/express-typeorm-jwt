import { NextFunction, Request, Response, Router } from 'express'
import * as jwt from 'jsonwebtoken'
import App from '../App'
import { UserRepository } from '../repositories/user'

export class AuthController {
    public path = '/auth'
    public router = Router()
    public app: App
    public userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    public initializeRoutes() {
        // Controller middleware
        // TODO: Add middleware

        // Controller endpoints
        this.router.post(this.path, this.login)
    }

    login = async (req: Request, res: Response) => {
        const user = await this.userRepository.findBy('email', req.body.email)
        if (!user) {
            return res.status(403).send()
        }

        if (!user.auth(req.body.password)) {
            return res.status(403).send()
        }

        const token = jwt.sign({ id: user.id }, req.app.get('key'), {
            expiresIn: '1y',
        })

        res.send(token)
    }
}
