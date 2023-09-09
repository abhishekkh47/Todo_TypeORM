import express = require('express');
import cors = require('cors');
const {
    createTodo,
    getTodo,
    getTodoById,
    deleteTodo,
    updateTodo
} = require('../controller/todoController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// enable cross-origin middleware
router.use(cors());
// fire the requireAuth() function before going to any of the routes
// requireAuth for all TODO routes
router.use(requireAuth);

// GET all todos
router.get('/', getTodo);

// GET a single todo
router.get('/:id', getTodoById);

// POST a new todo
router.post('/', createTodo);


// DELETE a todo
router.delete('/:id', deleteTodo);

// UPDATE a new todo
router.put('/:id', updateTodo);

export default router;