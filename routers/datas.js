const express = require("express");
const { getDatas, createData } = require("../controllers/datas");

const datas = express.Router();

datas.route("/").get(async (req, res) => {
  res.send(await getDatas());
});

datas.route("/").post(async (req, res) => {
  const { suhu, tekanan, e_nose, kualitas_udara, deviceId } = req.body;
  const data = {
    suhu,
    tekanan,
    e_nose,
    kualitas_udara,
    deviceId,
  };
  res.send(await createData(data));
});

module.exports = datas;
