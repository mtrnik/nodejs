import {Request, Response} from "express";
import {Repository} from "typeorm";
import {validationResult} from "express-validator";
import {AppDataSource} from "../data-source";
import {Author, Task} from "../models";

export class TaskController {

    private authorRepository: Repository<Author>
    private taskRepository: Repository<Task>

    constructor() {
        this.authorRepository = AppDataSource.getRepository(Author)
        this.taskRepository = AppDataSource.getRepository(Task)
    }

    async getTasks (req: Request, res: Response) {
        const tasks = await this.taskRepository.find()
        res.json(tasks)
    }

    async getTaskById(req: Request, res: Response){
        const task = await this.taskRepository.findOneBy({
            id: parseInt(req.params.id)
        })

        if (!task) {
            res.status(404).send('Task not found');
        } else {
            res.json(task);
        }
    }

    async createTask(req: Request, res: Response){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const author = await this.authorRepository.findOneBy({id: 1})

        const task = new Task()
        task.title = req.body.title
        task.description = req.body.description
        task.author = author

        await this.taskRepository.save(task);

        res.status(201).json(task);
    }

    async updateTask(req: Request, res: Response){
        const task = await this.taskRepository.findOneBy({
            id: parseInt(req.params.id)
        })

        if (!task) {
            res.status(404).send('Task not found');
        } else {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;

            await this.taskRepository.save(task)

            res.json(task);
        }
    }

    async deleteTask(req: Request, res: Response){
        const task = await this.taskRepository.findOneBy({
            id: parseInt(req.params.id)
        })

        if (!task) {
            res.status(404).send('Task not found');
        } else {
            await this.taskRepository.remove(task)
            res.status(204).send();
        }
    }

}