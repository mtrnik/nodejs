import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import {TaskController} from "../controllers";
import {Task} from "../entities";
import {RequestExtended, ResponseExtended} from "../interfaces";

export const taskRouter = Router();

const taskController = new TaskController()

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
];

taskRouter.get('/', (req: Request, res: Response<Task[]>) => taskController.getTasks(req, res) );
taskRouter.get('/:id',  (req: RequestExtended<{id: string}>, res: ResponseExtended<Task>) => taskController.getTaskById(req, res));
taskRouter.post('/', taskValidationRules, (req: RequestExtended<unknown, Task>, res: ResponseExtended<Task>) => taskController.createTask(req, res));
taskRouter.put('/:id',  taskValidationRules, (req: RequestExtended<{id: string}, Task>, res: ResponseExtended<Task>) => taskController.updateTask(req, res));
taskRouter.delete('/:id', (req: RequestExtended<{id: string}>, res: Response) => taskController.deleteTask(req, res));
