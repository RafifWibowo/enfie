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

    // Insert dummy data here
    try {
      const dummy_record = 100;

      for (let i = 0; i < dummy_record; i++) {
        const dummyData = {
          suhu: generateRandomTemperature(),
          tekanan: generateRandomTemperature(),
          e_nose: generateRandomTemperature(),
          kualitas_udara: generateRandomTemperature(),
          deviceId: generateRandomInt(),
        };
        // const query = "INSERT INTO data (suhu, a) VALUES (?, ?)";
        // const values = [data.name, data.age];

        await connection.query("INSERT INTO data SET ?", dummyData);
        console.log(`Inserted: ${i + 1} data`);
      }

      console.log("Dummy data inserted successfully.");
    } catch (insertError) {
      console.error("Error inserting dummy data:", insertError);
    } finally {
      connection.end();
    }
  }
});

function generateRandomTemperature() {
  // Generate a random number between 350 and 450 (inclusive)
  const randomTemperature = Math.floor(Math.random() * (450 - 350 + 1)) + 350;

  // Convert the random number to a temperature in Celsius
  const temperatureInCelsius = randomTemperature / 10;

  return temperatureInCelsius;
}

function generateRandomInt() {
  // Generate a random number between 0 and 1 (inclusive)
  const randomFraction = Math.random();

  // Map the random fraction to integers 1, 2, or 3
  if (randomFraction <= 1 / 3) {
    return 1;
  } else if (randomFraction <= 2 / 3) {
    return 2;
  } else {
    return 3;
  }
}
