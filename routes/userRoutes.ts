import express = require('express');
import cors = require('cors');
const {signupUser, loginUser} = require('../controller/userController');

const router = express.Router();

router.use(cors());
// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

export default router;