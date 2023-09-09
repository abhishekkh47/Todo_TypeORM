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

// get a single workout
const getTodoById = async (req, res) => {
  const { id } = req.params;
  var todo = null;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(400).json({ Error: 'No such workout' });
  // }
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      todo = await todosRepository.find({ where: { id: id } });
      res.status(200).json(todo);
    });

    if (!todo) {
      res.status(404).json({ Error: "No such todo" });
    } else {
      res.status(200).json(todo);
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// create a new workout
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
    // const workout = await Workout.create({ title, load, reps, user_id });
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

// delete a single workout
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(500).json({ Error: 'No such workout' });
  // }
  try {
    connection.then(async (connection) => {
      const todosRepository = connection.getRepository(todos);
      const todo = await todosRepository.delete(id);
      if (!todo) {
        res.status(404).json({ Error: "No such workout" });
      } else {
        res.status(200).json(todo);
      }
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// update a single workout
const updateTodo = async (req, res) => {
//   const { id } = req.params;
//   const { title, reps, load } = req.body;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(500).json({ Error: 'No such workout' });
  // }
  try {
    connection.then(async (connection) => {
        const todosRepository = connection.getRepository(todos);
        const todo = await todosRepository.findOne(req.params.id);
      todosRepository.merge(todo, req.body);
      const result = await todosRepository.save(todo);
    res.status(200).json(todo);
    })
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { createTodo, getTodo, getTodoById, deleteTodo, updateTodo };
