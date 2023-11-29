import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Author} from "./author.model";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    completed: boolean;

    @ManyToOne(() => Author, (author) => author.tasks, {
        cascade: true,
    })
    author: Author
}