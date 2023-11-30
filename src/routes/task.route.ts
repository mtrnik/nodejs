import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Author, Task } from '../models';
import {AppDataSource} from "../data-source";

const authorRepository = AppDataSource.getRepository(Author)
const taskRepository = AppDataSource.getRepository(Task)

export const taskRouter = Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
];

taskRouter.get('/', async (req: Request, res: Response) => {
    const tasks = await taskRepository.find()
    res.json(tasks)
});

taskRouter.get('/:id', async (req: Request, res: Response) => {
    const task = await taskRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});


taskRouter.post('/', taskValidationRules, async     (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const author = await authorRepository.findOneBy({id: 1})

    const task = new Task()
    task.title = req.body.title
    task.description = req.body.description
    task.author = author

    await taskRepository.save(task);

    res.status(201).json(task);
});

taskRouter.put('/:id',  taskValidationRules, async (req: Request, res: Response) => {
    const task = await taskRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;

        await taskRepository.save(task)

        res.json(task);
    }
});

taskRouter.delete('/:id', async (req: Request, res: Response) => {
    const task = await taskRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        await taskRepository.remove(task)
        res.status(204).send();
    }
});
