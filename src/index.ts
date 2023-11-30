import express, { Application } from 'express';
import { AppDataSource } from "./data-source"

import { authRouter, taskRouter } from "./routes";
import {isAuthenticated} from "./middlewares/auth.middleware";

AppDataSource.initialize().then(async () => {
    const app: Application = express();
    const port = process.env.PORT || 8000;

    app.use(express.json());

    /**
     * TODO:
     * - Scraping
     * - Logging
     */

    app.use('/auth', authRouter);

    app.use(isAuthenticated)
    app.use('/tasks', taskRouter);

    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
