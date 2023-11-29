import "reflect-metadata"
import { DataSource } from "typeorm"

import {Task} from "./models/task.model";
import {Author} from "./models/author.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [Task, Author],
    synchronize: true,
    logging: true,
    migrations: [],
})