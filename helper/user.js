const db = require("../configs/connection");

const checkEmail = async (email) => {
  const data = await db.query("SELECT email FROM user WHERE email = ?", [email]);
  if (data.length > 0) return false;
  return true;
};

const checkPassword = (password) => {
  if (password.length < 6) {
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
};

const authEmail = async (email) => {
  const user = await db.query("SELECT name FROM user WHERE email = ?", [email]);
  //   console.log(user[0].name);
  if (user.length == 0) return false;
  return true;
};

const authPass = async (email, password) => {
  const data = await db.query("SELECT name FROM user WHERE email = ? AND password = ?", [email, password]);
  //   console.log(data[0].name);
  if (data.length == 0) return false;
  return true;
};

module.exports = { checkEmail, checkPassword, authEmail, authPass };
