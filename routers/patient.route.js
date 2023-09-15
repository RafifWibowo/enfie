const express = require("express");
const middleware = require("../middleware/jwt");
const { getPatients, insertPatient } = require("../controllers/patient.controller");

const router = express.Router();

router.get("/", middleware.validateToken, async (req, res) => {
  const id = req.userData.userId;
  res.send(await getPatients(id));
});

router.post("/", middleware.validateToken, async (req, res) => {
  const user_id = req.userData.userId;
  const name = req.body.name;
  const data = {
    name,
    user_id,
  };
  res.send(await insertPatient(data));
});

module.exports = router;
