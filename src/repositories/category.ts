import { getRepository, Repository } from 'typeorm'
import { Category } from '../models/Category.entity'

export class CategoryRepository {
    private repository: Repository<Category>

    constructor() {
        this.repository = getRepository(Category)
    }

    findAll() {
        return this.repository.find()
    }

    find(categoryId: number) {
        return this.repository.findOne(categoryId)
    }

    create(category: Category) {
        const categoryRecord = this.repository.create(category)
        return this.repository.save(categoryRecord)
    }

    async update(categoryId: number, categoryData: Partial<Category>) {
        const category = await this.find(categoryId)
        return this.repository.merge(category, categoryData)
    }

    delete(categoryId: number) {
        return this.repository.delete({ id: categoryId })
    }
}
