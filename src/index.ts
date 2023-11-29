import express, { Request, Response , Application } from 'express';

import taskRoutes from './routes/task.route';

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world in typescript 2');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});