const db = require("../configs/connection");

const getDatas = async () => {
  const dataList = await db.query("SELECT * FROM data");
  return dataList;
};

const createData = async (data) => {
  const query = await db.query("INSERT INTO data SET ?", [data]);
  if (!query.affectedRows) return "error when inserting data";
  return "data created";
};

module.exports = { getDatas, createData };
