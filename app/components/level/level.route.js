const controller = require("./level.controller");

module.exports = (app) => {
  app.post("/level/create", controller.createLevel);
};
