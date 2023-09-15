const db = require("../configs/connection");
const jwt = require("jsonwebtoken");
const { checkEmail, checkPassword, authEmail, authPass } = require("../helper/user");

const getUsers = async () => {
  const userList = await db.query("SELECT * FROM user");
  return userList;
};

const getUser = async (id) => {
  const userData = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return userData;
};

const registUser = async (name, email, password) => {
  const emailExist = await checkEmail(email);
  if (!emailExist) {
    return {
      status: "error",
      message: "Email sudah digunakan",
    };
  }

  if (!checkPassword(password)) {
    return {
      status: "error",
      message: "Password belum cukup kuat",
    };
  }

  const is_admin = false;
  const user = {
    name,
    email,
    password,
    is_admin,
  };

  const query = await db.query("INSERT INTO user SET ?", [user]);
  if (!query.affectedRows) {
    return {
      status: "error",
      message: "error when inserting data",
    };
  }

  return {
    status: "success",
    message: "User terdaftar",
  };
};

const loginUser = async (email, password) => {
  const checkEmail = await authEmail(email);
  // console.log(checkEmail);
  if (!checkEmail) {
    return {
      status: "error",
      message: "email tidak terdaftar",
    };
  }

  const checkPass = await authPass(email, password);
  // console.log(checkPass);
  if (!checkPass) {
    return {
      status: "error",
      message: "password salah",
    };
  }

  const data = await db.query("SELECT id, name FROM user WHERE email = ? AND password = ?", [email, password]);
  const id = data[0].id;
  const name = data[0].name;
  // console.log(data[0].id);
  const token = jwt.sign({ userId: id, name: name }, process.env.JWT_KEY, { expiresIn: "1d" });
  return {
    status: "success",
    message: "Berhasil Login",
    data: token,
  };
};

module.exports = { getUsers, registUser, loginUser, getUser };
