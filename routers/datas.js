const express = require("express");
const { getDatas, createData, getTempById, getPressureById, getEnoseById, getAirQualById } = require("../controllers/datas");

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

datas.route("/temp/:id").get(async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getTempById(id));
});

datas.route("/press/:id").get(async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getPressureById(id));
});

datas.route("/enose/:id").get(async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getEnoseById(id));
});

datas.route("/airqual/:id").get(async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getAirQualById(id));
});

module.exports = datas;
