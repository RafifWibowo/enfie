const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const users = require("./routers/user.route");
const datas = require("./routers/data.route");
const patients = require("./routers/patient.route");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Welcom to Enfie rest api.");
});

app.use("/users", users);
app.use("/datas", datas);
app.use("/patients", patients);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
