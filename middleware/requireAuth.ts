const jwt = require("jsonwebtoken");
import { users } from "../entities/user";
import { connection } from "../connection/connection";

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { email } = jwt.verify(token, process.env.SECRET);

    connection.then(async (connection) => {
      const userRepository = connection.getRepository(users);
      req.user = await userRepository.find({ where: { email: email } });
    //   req.user = await users.find({ email }).select("email");
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
