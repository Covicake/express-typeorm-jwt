import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from './User.entity'
import { Category } from './Category.entity'

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'integer' })
    price: string

    @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
    imageUrl: string

    @ManyToOne(() => User, (user) => user.items)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Category, (category) => category.items)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    active: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: 'string'

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: 'string'
}
