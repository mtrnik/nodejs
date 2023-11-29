import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Task } from '../models/task.model';
import {AppDataSource} from "../data-source";

const taskRepository = AppDataSource.getRepository(Task)

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

router.get('/', async (req: Request, res: Response) => {
    const tasks = await taskRepository.find()
    res.json(tasks)
});

router.get('/:id', async (req: Request, res: Response) => {
    const task = await taskRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});


router.post('/', taskValidationRules, async     (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const task = new Task()
    task.title = req.body.title
    task.description = req.body.description
    task.completed =req.body.completed

    await taskRepository.save(task);

    res.status(201).json(task);
});

router.put('/:id',  taskValidationRules, async (req: Request, res: Response) => {
    const task = await taskRepository.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        await taskRepository.save(task)

        res.json(task);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
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

export default router;
