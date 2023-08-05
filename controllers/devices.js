const db = require("../configs/connection");

const getDevices = async () => {
  const deviceList = await db.query("SELECT * FROM device");
  return deviceList;
};

module.exports = getDevices;
