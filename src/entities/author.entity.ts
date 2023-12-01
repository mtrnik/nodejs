import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Task} from "./task.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.author) // note: we will create author property in the Photo class below
    tasks: Task[]
}