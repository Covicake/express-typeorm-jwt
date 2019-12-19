import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Item } from '../Item/Item';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Item, item => item.user)
    items: Item[];

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    lastname: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    image_url: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    email: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    recoverHash: string;

    @Column({type: 'tinyint', unsigned: true, default: 1})
    active: number;

    @CreateDateColumn()
    created_at: 'string';

    @UpdateDateColumn()
    updated_at: 'string';

    static removePropertiesFrom(users: User[])
    {
        let slimUsers = users.map((user) => {
            let slimUser =  {
                id: user.id,
                fullname: user.name + ' ' + user.lastname,
                name: user.name,
                email: user.email,
                image_url: user.image_url,
                items: user.items.length
            }
            return slimUser;
        });

        return slimUsers;
    }

    static async login(req)
    {
        const user = await User.findOne({email: req.body.email});
        if (!user) { return false; }

        if (!user.auth(req.body.password)) return false

        const token = jwt.sign({id: user.id}, req.app.get('key'), {expiresIn: '1y'});

        let responseUser: any = user;
        responseUser.token = token;
        return responseUser;
    }

    auth(password)
    {
        return bcrypt.compareSync(password, this.password)
    }

    @BeforeInsert()
    encryptPassword()
    {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}