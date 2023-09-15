const db = require("../configs/connection");

const getDatas = async () => {
  const dataList = await db.query("SELECT * FROM data");
  return dataList;
};

const createData = async (data) => {
  const query = await db.query("INSERT INTO data SET ?", [data]);
  if (!query.affectedRows) {
    return { message: "error when inserting data" };
  }
  return { message: "data created" };
};

const getTempById = async (id) => {
  const tempData = await db.query("SELECT suhu FROM data WHERE deviceId = $1", [id]);
  return tempData;
};
const getPressureById = async (id) => {
  const pressureData = await db.query("SELECT tekanan FROM data WHERE deviceId = $1", [id]);
  return pressureData;
};
const getEnoseById = async (id) => {
  const EnoseData = await db.query("SELECT e_nose FROM data WHERE deviceId = $1", [id]);
  return EnoseData;
};
const getAirQualById = async (id) => {
  const AirQualData = await db.query("SELECT kualitas_udara FROM data WHERE deviceId = $1", [id]);
  return AirQualData;
};

module.exports = { getDatas, createData, getAirQualById, getEnoseById, getTempById, getPressureById };
