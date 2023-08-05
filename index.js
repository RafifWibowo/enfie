const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Welcom to Enfie rest api.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
