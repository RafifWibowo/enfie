const express = require("express");
const { getUsers, registUser, loginUser } = require("../controllers/users");

const users = express.Router();

users.route("/").get(async (req, res) => {
  res.send(await getUsers());
});

users.route("/register").post(async (req, res) => {
  const { name, email, password } = req.body;
  const response = await registUser(name, email, password);
  res.send(response);
});

users.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const response = await loginUser(email, password);
  res.send(response);
});

module.exports = users;
