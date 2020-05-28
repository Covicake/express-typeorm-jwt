import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Item } from './Item.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
    imageUrl: string

    @OneToMany(() => Item, (item) => item.category)
    items: Item[]

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    active: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: 'string'

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: 'string'
}
