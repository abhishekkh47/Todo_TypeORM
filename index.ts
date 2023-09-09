require('dotenv').config();
import * as express from "express";
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
  
const server = app.listen(process.env.PORT, () => {
  console.log("server running at 3000....");
}); 
