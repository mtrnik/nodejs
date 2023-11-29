import express, { Request, Response , Application } from 'express';
import { AppDataSource } from "./data-source"

import taskRoutes from './routes/task.route';

AppDataSource.initialize().then(async () => {
    const app: Application = express();
    const port = process.env.PORT || 8000;

    app.use(express.json());

    /**
     * TODO:
     * - Auth,
     * - Controllers?
     * - Logging
     */

    app.use('/tasks', taskRoutes);

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world in typescript 2');
    });

    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
