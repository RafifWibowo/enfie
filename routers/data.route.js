const express = require("express");
const { createData, getTempById, getPressureById, getEnoseById, getAirQualById } = require("../controllers/data.controller");
const middleware = require("../middleware/jwt");
const router = express.Router();

router.post("/", async (req, res) => {
  const { suhu, tekanan, e_nose, kualitas_udara, patient_id } = req.body;
  const data = {
    suhu,
    tekanan,
    e_nose,
    kualitas_udara,
    patient_id,
  };
  const result = await createData(data);
  res.send(result);
});

router.get("/temp", middleware.validateToken, async (req, res) => {
  const patient_id = req.body.patient_id;
  const user_id = req.userData.userId;
  res.send(await getTempById(patient_id, user_id));
});

router.get("/press", middleware.validateToken, async (req, res) => {
  const patient_id = req.body.patient_id;
  const user_id = req.userData.userId;
  res.send(await getPressureById(patient_id, user_id));
});

router.get("/enose", middleware.validateToken, async (req, res) => {
  const patient_id = req.body.patient_id;
  const user_id = req.userData.userId;
  res.send(await getEnoseById(patient_id, user_id));
});

router.get("/airqual", middleware.validateToken, async (req, res) => {
  const patient_id = req.body.patient_id;
  const user_id = req.userData.userId;
  res.send(await getAirQualById(patient_id, user_id));
});

module.exports = router;
