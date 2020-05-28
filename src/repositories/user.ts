import { getRepository, Repository } from 'typeorm'
import { User } from '../models/User.entity'

export class UserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    findAll() {
        return this.repository.find()
    }

    find(userId: number) {
        return this.repository.findOne(userId)
    }

    findBy(field: keyof User, value: User[keyof User]) {
        return this.repository.findOne({ [field]: value })
    }

    create(user: User) {
        const userRecord = this.repository.create(user)
        this.repository.save(userRecord)
    }

    async update(userId: number, userData: Partial<User>) {
        const user = await this.find(userId)
        return this.repository.merge(user, userData)
    }

    delete(userId: number) {
        return this.repository.delete({ id: userId })
    }
}
