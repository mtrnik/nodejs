import express, { Application } from 'express';
import { AppDataSource } from "./data-source"

import { authRouter, taskRouter } from "./routes";

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

    app.use('/auth', authRouter);
    app.use('/tasks', taskRouter);

    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
