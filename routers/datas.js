const express = require("express");
const getDatas = require("../controllers/datas");

const datas = express.Router();

datas.route("/").get(async (req, res) => {
  res.send(await getDatas());
});

module.exports = datas;
