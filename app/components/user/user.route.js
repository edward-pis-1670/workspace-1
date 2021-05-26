const controller = require("./user.controller");

module.exports = (app) => {
  app.post("/users/create", controller.createUser);
};
