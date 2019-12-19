import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from 'typeorm';
import { Item } from '../Item/Item';

@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToMany(type => Item)
    @JoinTable()
    items: Item[];

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    image_url: string;

    @Column({type: 'tinyint', default: 1, unsigned: true})
    active: string;

    @CreateDateColumn()
    created_at: 'string';

    @UpdateDateColumn()
    updated_at: 'string';
}