const db = require("../configs/connection");

const getUsers = async () => {
  const userList = await db.query("SELECT * FROM user");
  return userList;
};

module.exports = getUsers;
