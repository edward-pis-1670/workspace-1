require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./app/components/index");
require("./app/components/authen/passport");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ ms: "Connect successfully" });
});

const db = require("./app/models/db.config");
// const { route } = require("./app/components/course/course.route");
db.sequelize.sync();
route(app);
// require("./app/components/course/course.route")(app);
require("./app/components/level/level.route")(app);
require("./app/components/user/user.route")(app);
require("./app/components/lecture/lecture.route")(app);
// require("./app/components/genre/genre.route")(app);

app.listen(process.env.PORT || 5000, () => {
  console.log("SERVER IS RUNNING ON PORT 3000");
});
