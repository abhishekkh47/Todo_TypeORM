require('dotenv').config();
const jwt = require("jsonwebtoken");
import { users } from "../entities/user";
import { connection } from "../connection/connection";

const requireAuth = async (req: any, res: any, next: any) => {
  // verify authentication
  const { authorization } = req.headers;

  // return error if authorization header is not present
  if (!authorization) {
    return res.status(404).json({ error: "Bad Request - Authorization token required" });
  } else if ((authorization.split(" ")[0] != 'bearer') && (authorization.split(" ")[0] != 'Bearer')){
    return res.status(404).json({ error: "Bad Request - Authorization token invalid" });
  }

  const token = authorization.split(" ")[1];

  try {
    // authenticate jwt token
    const { email } = jwt.verify(token, process.env.SECRET);

    connection.then(async (connection) => {
      const userRepository = connection.getRepository(users);
      req.user = await userRepository.find({ where: { email: email } });
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized : Invalid token" });
  }
};

export default requireAuth