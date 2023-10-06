const express = require("express");
const middleware = require("../middleware/jwt");
const { getPatients, insertPatient, deletePatient } = require("../controllers/patient.controller");

const router = express.Router();

router.get("/", middleware.validateToken, async (req, res) => {
  const id = req.userData.userId;
  res.send(await getPatients(id));
});

router.post("/", middleware.validateToken, async (req, res) => {
  const user_id = req.body.userId;
  const name = req.body.name;
  const birth = req.body.birth;
  const gender = req.body.gender;
  const address = req.body.address;
  const data = {
    name,
    user_id,
    birth,
    gender,
    address,
  };
  res.send(await insertPatient(data));
});

router.delete("/", middleware.validateToken, async (req, res) => {
  const user_id = req.body.user_id;
  const id = req.body.patient_id;
  res.send(await deletePatient(id, user_id));
});

module.exports = router;
