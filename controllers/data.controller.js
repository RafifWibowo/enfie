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

const getTempById = async (patient_id, user_id) => {
  const check = await checkPatient(patient_id, user_id);
  if (!check) {
    return {
      status: "error",
      message: "Bukan pasien anda",
    };
  }
  const tempData = await db.query("SELECT suhu FROM data WHERE patient_id = ?", [patient_id]);
  return {
    status: "success",
    message: "Berhasil mengambil data suhu",
    data: tempData,
  };
};

const getPressureById = async (patient_id, user_id) => {
  const check = await checkPatient(patient_id, user_id);
  if (!check) {
    return {
      status: "error",
      message: "Bukan pasien anda",
    };
  }
  const pressureData = await db.query("SELECT tekanan FROM data WHERE patient_id = ?", [patient_id]);
  return {
    status: "success",
    message: "Berhasil mengambil data tekanan",
    data: pressureData,
  };
};

const getEnoseById = async (patient_id, user_id) => {
  const check = await checkPatient(patient_id, user_id);
  if (!check) {
    return {
      status: "error",
      message: "Bukan pasien anda",
    };
  }
  const enoseData = await db.query("SELECT e_nose FROM data WHERE patient_id = ?", [patient_id]);
  return {
    status: "success",
    message: "Berhasil mengambil data enose",
    data: enoseData,
  };
};

const getAirQualById = async (patient_id, user_id) => {
  const check = await checkPatient(patient_id, user_id);
  if (!check) {
    return {
      status: "error",
      message: "Bukan pasien anda",
    };
  }
  const airQualData = await db.query("SELECT kualitas_udara FROM data WHERE patient_id = ?", [patient_id]);
  return {
    status: "success",
    message: "Berhasil mengambil data kualitas udara",
    data: airQualData,
  };
};

module.exports = { createData, getAirQualById, getEnoseById, getTempById, getPressureById };
