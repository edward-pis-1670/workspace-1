const controller = require("./lecture.controller");

module.exports = (app) => {
  app.post("/lectures/create", controller.createLecture);
};
