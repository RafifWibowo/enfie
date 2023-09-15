const express = require("express");
const { getDatas, createData, getTempById, getPressureById, getEnoseById, getAirQualById } = require("../controllers/data.controller");
const { route } = require("./user.route");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await getDatas());
});

router.post("/", async (req, res) => {
  const { suhu, tekanan, e_nose, kualitas_udara, deviceId } = req.body;
  const data = {
    suhu,
    tekanan,
    e_nose,
    kualitas_udara,
    deviceId,
  };
  const result = await createData(data);
  res.send(JSON.stringify(result));
});

router.get("/temp/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getTempById(id));
});

router.get("/press/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getPressureById(id));
});

router.get("/enose/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getEnoseById(id));
});

router.get("/airqual/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await getAirQualById(id));
});

module.exports = router;
