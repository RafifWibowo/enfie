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

const storePengurang = async (patient_id, variable) => {
  const query = await db.query("INSERT INTO data_pengurang (patient_id, variable) Values (?, ?) ON CONFLICT(patient_id) DO UPDATE SET variable = ?", [patient_id, variable, variable]);
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
}

const checkData = async (variable, patient_id) => {
  const getPengurang = variable
  const getLatestVocData = await db.query("SELECT voc FROM data WHERE patient_id = ? ORDER BY id DESC LIMIT 1", [patient_id]);
  const result = getLatestVocData - getPengurang;
  console.log('res: ', result)
  let state = "";
  if (result <= 7057) {
    state = "Kering"
  } else if (result > 7057 && result <= 25025) {
    state = "Sedikit Basah"
  } else if (result > 25025 && result <= 30023) {
    state = "Basah"
  } else {
    state = "Sangat Basah"
  }
  return {
    status: "success",
    result: state
  }
}

module.exports = { createData, getData, storePengurang, checkData };
