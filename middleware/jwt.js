const jwt = require("jsonwebtoken");
const db = require("../configs/connection");
require("dotenv").config();

module.exports = {
  validateToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const checkUser = await db.query("SELECT * FROM user WHERE id = ? AND name = ?", [decoded.userId, decoded.name]);
      if (!checkUser) {
        return {
          status: "error",
          message: "Your session is not valid",
        };
      }
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!;",
      });
    }
  },
};
