const express = require("express");
const getUsers = require("../controllers/users");

const users = express.Router();

users.route("/").get(async (req, res) => {
  res.send(await getUsers());
});

module.exports = users;
