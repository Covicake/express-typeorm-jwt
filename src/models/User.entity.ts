import * as bcrypt from 'bcrypt'
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Item } from './Item.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    lastname: string

    @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
    imageUrl: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    email: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    recoverHash: string

    @OneToMany(() => Item, (item) => item.user)
    items: Item[]

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    active: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: 'string'

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: 'string'

    @BeforeInsert()
    createRecoverHash() {
        this.recoverHash = uuid()
    }

    auth(password: string) {
        return bcrypt.compareSync(password, this.password)
    }

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }
}
