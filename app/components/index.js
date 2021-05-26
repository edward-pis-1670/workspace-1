const passport = require("passport");
const CourseRouter = require("./course/course.route");
const GenreRouter = require("./genre/genre.route");
const AuthenRouter = require("./authen/authen.route");
const UserRouter = require("./user/user.route");

require("../middleware/passport");

function route(app) {
  app.use(passport.initialize());
  app.use("/courses", CourseRouter);
  app.use("/", GenreRouter);
  app.use("/auth", AuthenRouter);
  app.use(
    "/users",
    passport.authenticate("jwt", { session: false }),
    UserRouter
  );
}

module.exports = route;