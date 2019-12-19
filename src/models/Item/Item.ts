import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from '../Category/Category';
import { Tag } from '../Tag/Tag';
import { User } from '../User/User';

@Entity()
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.items)
    user: User;

    @ManyToMany(type => Category)
    categories: Category[];

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    image_url: string;

    @Column({type: 'varchar', length: 255})
    store: string;

    @Column({type: 'decimal', precision: 4, default: 0.0000, nullable: true})
    price: number;

    @ManyToMany(type => Tag)
    tags: Tag[];

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    city: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    province: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    country: string;    

    @Column({type: 'varchar', length: 20, nullable: true})
    phone: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    email: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    webpage: string;

    @Column({type: 'text', nullable: true})
    notes: string;

    @Column({type: 'tinyint', unsigned: true, default: 1})
    active: number;

    @CreateDateColumn()
    created_at: 'string';

    @UpdateDateColumn()
    updated_at: 'string';
}