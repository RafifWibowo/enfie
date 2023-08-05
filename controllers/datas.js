const db = require("../configs/connection");

const getDatas = async () => {
  const dataList = await db.query("SELECT * FROM data");
  return dataList;
};

module.exports = getDatas;
