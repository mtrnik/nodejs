import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import {TaskController} from "../controllers/task.controller";

export const taskRouter = Router();

const taskController = new TaskController()

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
];

taskRouter.get('/', async (req: Request, res: Response) => taskController.getTasks(req, res) );
taskRouter.get('/:id', async (req: Request, res: Response) => taskController.getTaskById(req, res));
taskRouter.post('/', taskValidationRules, async (req: Request, res: Response) => taskController.createTask(req, res));
taskRouter.put('/:id',  taskValidationRules, async (req: Request, res: Response) => taskController.updateTask(req, res));
taskRouter.delete('/:id', async (req: Request, res: Response) => taskController.deleteTask(req, res));
