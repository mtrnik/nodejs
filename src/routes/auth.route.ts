import { Router, Request, Response } from 'express';

export const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {

    // const author = await authorRepository.findOneBy({id: 1})
    //
    // const task = new Task()
    // task.title = req.body.title
    // task.description = req.body.description
    // task.author = author
    //
    // await taskRepository.save(task);
    //
    // res.status(201).json(task);
});
