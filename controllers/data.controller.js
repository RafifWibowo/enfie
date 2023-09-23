const db = require("../configs/connection");
const { checkPatient } = require("../helper/patient");

const createData = async (data) => {
  const query = await db.query("INSERT INTO data SET ?", [data]);
  if (!query.affectedRows) {
    return {
      status: "error",
      message: "Error when inserting data",
    };
  }
  return {
    status: "success",
    message: "Data created",
  };
};

const getData = async (patient_id, user_id) => {
  const check = await checkPatient(patient_id, user_id);
  if (!check) {
    return {
      status: "error",
      message: "Bukan pasien anda",
    };
  }
  const allData = await db.query("SELECT suhu, humidity, voc FROM data WHERE patient_id = ?", [patient_id]);
  return {
    status: "success",
    message: "Berhasil mengambil data",
    data: allData,
  };
};

module.exports = { createData, getData };
