const express = require("express");
const getDevices = require("../controllers/devices");

const devices = express.Router();

devices.route("/").get(async (req, res) => {
  res.send(await getDevices());
});

module.exports = devices;
