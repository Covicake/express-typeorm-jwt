import { getRepository, Repository } from 'typeorm'
import { Item } from '../models/Item.entity'

export class ItemRepository {
    private repository: Repository<Item>

    constructor() {
        this.repository = getRepository(Item)
    }

    findAll() {
        return this.repository.find()
    }

    find(itemId: number) {
        return this.repository.findOne(itemId)
    }

    findUserItems(userId: number) {
        return this.repository.find({ where: { user: userId } })
    }

    findCategoryItems(categoryId: number) {
        return this.repository.find({ where: { category: categoryId } })
    }

    create(item: Item) {
        const itemRecord = this.repository.create(item)
        return this.repository.save(itemRecord)
    }

    async update(itemId: number, itemData: Partial<Item>) {
        const item = await this.find(itemId)
        return this.repository.merge(item, itemData)
    }

    delete(itemId: number) {
        return this.repository.delete({ id: itemId })
    }
}
