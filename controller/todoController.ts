import { connection } from "../connection/connection";
import { todos } from "../entities/todos";

const getTodo = async (req, res) => {
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      const todo = await todosRepository.find();
      res.status(200).json(todo);
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// get a single todo
const getTodoById = async (req, res) => {
  const { id } = req.params;
  var todo = null;
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      todo = await todosRepository.find({ where: { id: id } });

      if (!todo) {
        res.status(404).json({ Error: "No such todo" });
      } else {
        res.status(200).json(todo);
      }
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// create a new todo
const createTodo = async (req, res) => {
  const { title, description, status } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("load");
  }
  if (!status) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(404)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to DB
  try {
    // we will make use of the 'user' property which we added in the middleware 'requireAuth'
    const user_id = req.user._id;
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      const todo = todosRepository.create({ title, description, status });
      const results = await todosRepository.save(todo);
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    res.status(400).json({ Error: error.message });
  }
};

// delete a single todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      const todo = await todosRepository.delete(id);
      if (!todo) {
        res.status(404).json({ Error: "No such todo" });
      } else {
        res.status(200).json(todo);
      }
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// update a single todo
const updateTodo = async (req, res) => {
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      const todo = await todosRepository.findOne(req.params.id);
      todosRepository.merge(todo, req.body);
      const result = await todosRepository.save(todo);
      res.status(200).json(todo);
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { createTodo, getTodo, getTodoById, deleteTodo, updateTodo };
