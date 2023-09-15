const db = require("../configs/connection");

const checkPatient = async (patient_id, user_id) => {
  const patient = await db.query("SELECT * FROM patient WHERE id = ? AND user_id = ?", [patient_id, user_id]);
  if (patient.length == 0) return false;
  return true;
};

module.exports = { checkPatient };
