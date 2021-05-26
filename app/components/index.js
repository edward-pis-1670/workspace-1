const CourseRouter = require("./course/course.route");
const GenreRouter = require("./genre/genre.route");
const AuthenRouter = require("./authen/authen.route");
function route(app) {
  app.use("/courses", CourseRouter);
  app.use("/", GenreRouter);
  app.use("/", AuthenRouter);
}

module.exports = route;
