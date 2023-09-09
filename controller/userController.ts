import { users } from "../entities/user";
import { connection } from "../connection/connection";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

// This function generates a jwt token to create a session fro the user
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signup = async function (email: string, password: string) {
  try {
    var results = null;
    // validation
    if (!email || !password) {
      // throw errorMsg("All fields are required");
      return {
        status: "error",
        errorCode: 400,
        errorMsg: "All fields are required",
      };
    }
    if (!validator.isEmail(email)) {
      return {
        status: "error",
        errorCode: 400,
        errorMsg: "Email is not valid",
      };
      // throw errorMsg("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      return {
        status: "error",
        errorCode: 400,
        errorMsg: "Password not strong enough",
      };
      // throw errorMsg("Password not strong enough");
    }

    connection.then(async (connection) => {
      const userRepository = connection.getRepository(users);
      const exists = await userRepository.find({ where: { email: email } });

      if (exists.length > 0) {
        return {
          status: "error",
          errorCode: 400,
          errorMsg: "Email already in use",
        };
        // throw errorMsg("Email already in use");
      }
    });

    // add some dummy value to the secret/password to secure the password
    const salt = await bcrypt.genSalt(10);
    // generate an encoded string of the password using the dummy value added
    const hash = await bcrypt.hash(password, salt);

    connection.then(async (connection) => {
      const userRepository = connection.getRepository(users);
      const user = userRepository.create({ email, password: hash });
      results = await userRepository.save(user);

      return results;
    });
  } catch (error) {
    return {
      status: "error",
      errorCode: 400,
      errorMsg: error,
    };
  }
};

const login = async function (email: string, password: string) {
  try {
    if (!email || !password) {
      return {
        status: "error",
        errorCode: 400,
        errorMsg: "All fields are required",
      };
      // throw errorMsg("All fields are required");
    }
    connection.then(async (connection) => {
      const userRepository = connection.getRepository(users);
      const user = await userRepository.find({ where: { email: email } });

      if (user.length < 1) {
        return { status: "error", errorCode: 400, errorMsg: "Incorrect email" };
        // throw errorMsg("Incorrect email");
      }

      const match = await bcrypt.compare(password, user[0].password);
      if (!match) {
        return {
          status: "error",
          errorCode: 400,
          errorMsg: "Incorrect password",
        };
        // throw errorMsg("Invalid password");
      }
      return user;
    });
  } catch (error) {
    return {
      status: "error",
      errorCode: 400,
      errorMsg: error,
    };
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    console.log("return :", user);

    if (user.status == "error") {
      return res.status(user.errorCode).json(user);
    }
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
    if (user.status == "error") {
      return res.status(user.errorCode).json(user);
    }
    const token = createToken(email);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
