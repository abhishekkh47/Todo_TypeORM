import { users } from "../entities/user";
import { connection } from "../connection/connection";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// connection.then(async (connection) => {
//   const userRepository = connection.getRepository(users);
// });

const signup = async function (email: string, password: string) {
  var results = null;
  // vaidation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  connection.then(async (connection) => {
    const userRepository = connection.getRepository(users);
    const exists = await userRepository.find({ where: { email: email } });
    // console.log("EXISTS : ", exists);
    
    if (exists.length >0) {
      throw Error("Email already in use");
    }
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  connection.then(async (connection) => {
    const userRepository = connection.getRepository(users);
    const user = userRepository.create({ email, password: hash });
    results = await userRepository.save(user);
    
    return results;
});
};

const login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  connection.then(async (connection) => {
    const userRepository = connection.getRepository(users);
    const user = await userRepository.find({ where: { email: email } });
    
    if (user.length < 1) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      throw Error("Invalid password");
    }
    return user;
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);

    const token = createToken(email);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signup(email, password);

    const token = createToken(email);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
