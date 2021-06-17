require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./app/components/index");
const morgan = require("morgan");
const passport = require("passport");
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ ms: "Connect successfully" });
});
const db = require("./app/models/db.config");
// db.sequelize.sync();
route(app);

app.listen(process.env.PORT || 5000, () => {
  console.log("SERVER IS RUNNING ON PORT 5000");
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});
