import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as logger from 'morgan'
import { Connection, createConnection } from 'typeorm'

class App {
    public app: express.Application
    public port: number
    public connection: Connection // TypeORM connection to the database

    constructor(controllers: any[], port: number) {
        this.init(controllers, port)
    }

    public async init(controllers: any[], port: number) {
        this.app = express()
        this.port = port
        this.connection = await this.initializeModels()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    public authorize(
        req: express.Request<{ [userId: string]: string }>,
        res: express.Response,
        next
    ) {
        let token = req.headers.authorization
        if (!token) {
            return res.sendStatus(403)
        }

        token = token.split(' ')[1]
        jwt.verify(token, req.app.get('key'), (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            } else {
                req.app.set('userId', decoded.id)
                next()
            }
        })
    }

    private async initializeModels() {
        const connection = await createConnection()
        if (connection === undefined) {
            throw new Error('Error connecting to database')
        } // In case the connection failed, the app stops.
        connection.synchronize() // this updates the database schema to match the models' definitions (TODO: Set migrations)
        return connection
    }

    private initializeMiddlewares() {
        this.app.use(logger('dev'))
        this.app.use(cors('*'))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(express.json())
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            const controllerInstance = new controller()
            controllerInstance.app = this
            controllerInstance.initializeRoutes()
            this.app.use('/', controllerInstance.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default App
