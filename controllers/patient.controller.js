const db = require("../configs/connection");

const getPatients = async (userId) => {
  const patientList = await db.query("SELECT * FROM patient WHERE user_id = ?", [userId]);
  return {
    status: "success",
    message: "patients data found",
    data: patientList,
  };
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

const deletePatient = async (id, user_id) => {
  try {
    const response = await db.query("DELETE FROM patient WHERE id = ? AND user_id = ?", [id, user_id]);

    if (response.affectedRows === 0) {
      return {
        status: "error",
        message: "Patient not found for deletion",
      };
    }

    return {
      status: "success",
      message: "Patient data deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error when deleting patient data",
    };
  }
};

module.exports = { getPatients, insertPatient, deletePatient };
