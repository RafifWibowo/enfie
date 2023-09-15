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

      await connection.query(`CREATE TABLE IF NOT EXISTS patient (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), user_id INT, FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE);`);
      console.log("patient table created.");

      // const deviceCount = await connection.query("SELECT COUNT(*) AS count FROM device");

      // if (deviceCount[0].count === 0) {
      //   // Insert three data entries into the device table
      //   await connection.query(`
      //     INSERT INTO device (is_active)
      //     VALUES (false), (false), (false)
      //   `);
      //   console.log("Inserted 3 data entries into the device table.");
      // } else {
      //   console.log("Data entries in the device table already exist.");
      // }

      await connection.query(`CREATE TABLE IF NOT EXISTS data (id INT PRIMARY KEY AUTO_INCREMENT, suhu FLOAT, tekanan FLOAT, e_nose FLOAT, kualitas_udara FLOAT, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, patient_id INT, FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE);`);
      console.log("Data table created.");

      console.log("Success create table");
    } catch (insertError) {
      console.error("Error inserting dummy data:", insertError);
    } finally {
      connection.end();
    }
  }
});
