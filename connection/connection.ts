import { todos } from "../entities/todos";
import { createConnection } from "typeorm";

export const connection = createConnection({
  type: "postgres" ,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "rootuser",
  database: "demo",
  entities: [todos],
  synchronize: true,
  logging: false
});