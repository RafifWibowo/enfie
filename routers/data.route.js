const express = require("express");
const { createData, getData, storePengurang, checkData } = require("../controllers/data.controller");
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

router.post("/pengurang", async (req, res) => {
  const patient_id = req.body.patient_id;
  const variable = req.body.variable;
  res.send(await storePengurang(patient_id, variable))
})

router.post("/status", async (req, res) => {
  const variable = req.body.variable;
  const patient_id = req.body.patient_id;
  const response = await checkData(variable, patient_id)
  console.log(response)
  res.send(response)
})

module.exports = router;
