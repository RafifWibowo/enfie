const express = require("express");
const { createData, getData } = require("../controllers/data.controller");
const middleware = require("../middleware/jwt");
const router = express.Router();

router.post("/", async (req, res) => {
  const { suhu, humidity, voc, patient_id } = req.body;
  const data = {
    suhu,
    humidity,
    voc,
    patient_id,
  };
  const result = await createData(data);
  res.send(result);
});

router.get("/", middleware.validateToken, async (req, res) => {
  const patient_id = req.body.patient_id;
  const user_id = req.userData.userId;
  res.send(await getData(patient_id, user_id));
});

module.exports = router;
