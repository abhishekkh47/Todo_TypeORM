import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class todos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}