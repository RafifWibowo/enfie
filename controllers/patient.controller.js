const db = require("../configs/connection");

const getPatients = async (userId) => {
  const patientList = await db.query("SELECT * FROM patient WHERE user_id = ?", [userId]);
  return patientList;
};

const insertPatient = async (data) => {
  const response = await db.query("INSERT INTO patient SET ?", [data]);
  if (!response.affectedRows) {
    return {
      status: "error",
      message: "error when inserting data",
    };
  }
  return {
    status: "success",
    message: "patient data inserted",
  };
};

module.exports = { getPatients, insertPatient };
