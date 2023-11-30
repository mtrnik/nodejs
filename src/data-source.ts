import "reflect-metadata"
import { DataSource } from "typeorm"

import {Task, Author, User} from "./models";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [Task, Author, User],
    synchronize: true,
    logging: true,
    migrations: [],
})