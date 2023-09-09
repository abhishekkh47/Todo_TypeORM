import { todos } from "../entities/todos";
import { users } from "../entities/user";
import { createConnection } from "typeorm";

export const connection = createConnection({
  type: "postgres" ,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "rootuser",
  database: "demo",
  entities: [todos, users],
  synchronize: true,
  logging: false
});