import "reflect-metadata"
import { DataSource } from "typeorm"

import {Task} from "./models/task.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [Task],
    synchronize: true,
    logging: true,
})