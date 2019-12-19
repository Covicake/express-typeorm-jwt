import { Entity, PrimaryGeneratedColumn, Column, JoinTable, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Item } from '../Item/Item';

@Entity()
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToMany(type => Item)
    @JoinTable()
    items: Item[];

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'tinyint', default: 1, unsigned: true})
    active: string;

    @CreateDateColumn()
    created_at: 'string';

    @UpdateDateColumn()
    updated_at: 'string';
}