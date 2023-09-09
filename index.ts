require('dotenv').config();
import * as express from "express";
// import { connection } from "./connection/connection";
// import { todos } from "./entities/todos";
import todoRouter from './routes/todoRoutes'
import userRouter from './routes/userRoutes';

import * as cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/todos', todoRouter);
app.use('/api/user', userRouter);
app.get("/api", (req, res) => {
    res.send("Welcome to TODO App");
  });
  
const server = app.listen(3000, () => {
  console.log("server running at 3000....");
}); 

// connection
//   .then(async (connection) => {
//     console.log("connected");
//     const todosRepository = connection.getRepository(todos);

//     app.get("/api/todos", async (req, res) => {
//       const todos = await todosRepository.find();
//       res.send(todos);
//     });

//     app.post("/api/todos", async (req, res) => {
//       console.log("body", req.body);
//       const todos = await todosRepository.create(req.body);
//       const results = await todosRepository.save(todos);

//       res.json({
//         message: "success",
//         payload: results,
//       });
//     });

//     app.get("/api/todos/:id", async (req, res) => {
//       console.log("called");
//       console.log(req.params.id);
//       const todos = await todosRepository.findOne({
//         where: { id: req.params.id },
//       });
//       res.json({
//         message: "success",
//         payload: todos,
//       });
//     });

//     app.delete("/api/todos/:id", async (req, res) => {
//       const todos = await todosRepository.delete(req.params.id);
//       res.json({
//         message: "success",
//       });
//     });

//     app.put("/api/todos/:id", async (req, res) => {
//       const todos = await todosRepository.findOne(req.params.id);
//       todosRepository.merge(todos, req.body);
//       const result = await todosRepository.save(todos);
//       res.json({
//         message: "success",
//         payload: result,
//       });
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
