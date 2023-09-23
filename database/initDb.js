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

connection.connect(async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database.");
    try {
      console.log("Created table if not exist....");

      await connection.query(`CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), is_admin BOOLEAN);`);
      console.log("User table created.");

      await connection.query(`CREATE TABLE IF NOT EXISTS patient (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, user_id int NOT NULL, birth date NOT NULL, gender tinyint(1) NOT NULL, address text NOT NULL, PRIMARY KEY (id), KEY user_id (user_id), CONSTRAINT patient_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE);`);
      console.log("patient table created.");

      await connection.query(`CREATE TABLE IF NOT EXISTS data (id int NOT NULL AUTO_INCREMENT,suhu float DEFAULT NULL, humidity float DEFAULT NULL, voc float DEFAULT NULL, time timestamp NULL DEFAULT CURRENT_TIMESTAMP, patient_id int NOT NULL, PRIMARY KEY (id), KEY patient_id (patient_id), CONSTRAINT data_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patient (id) ON DELETE CASCADE);`);
      console.log("Data table created.");

      console.log("Success create table");
    } catch (insertError) {
      console.error("Error inserting dummy data:", insertError);
    } finally {
      connection.end();
    }
  }
});
