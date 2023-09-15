const express = require("express");
const { getUsers, registUser, loginUser, getUser } = require("../controllers/user.controller");
const middleware = require("../middleware/jwt");
const router = express.Router();

router.get("/all", async (req, res) => {
  res.send(await getUsers());
});

router.get("/", middleware.validateToken, async (req, res) => {
  const id = req.userData.userId;
  res.send(await getUser(id));
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const response = await registUser(name, email, password);
  res.send(response);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await loginUser(email, password);
  res.send(response);
});

module.exports = router;
