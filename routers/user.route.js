const express = require("express");
const { getUsers, registUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/all", async (req, res) => {
  res.send(await getUsers());
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
