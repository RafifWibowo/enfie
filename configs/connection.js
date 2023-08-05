const mysql = require("mysql");
const util = require("util");
const env = require("dotenv");

env.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) console.log(err);
  console.log("connected");
});

module.exports = connection;
