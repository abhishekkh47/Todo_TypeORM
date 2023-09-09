import express = require('express');
import cors = require('cors');
// const Workout = require('../models/workoutModel');
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
// requireAuth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getTodo);

// GET a single workout
router.get('/:id', getTodoById);

// POST a new workout
router.post('/', createTodo);

// res.json({ mssg: 'POST a new workout' });

// DELETE a workout
router.delete('/:id', deleteTodo);

// UPDATE a new workout
router.patch('/:id', updateTodo);

export default router;