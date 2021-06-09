const passport = require("passport");
const CourseRouter = require("./course/course.route");
const GenreRouter = require("./genre/genre.route");
const AuthenRouter = require("./authen/authen.route");
const UserRouter = require("./user/user.route");
const ResourceRouter = require("./resources/resource.route");
const AdminRouter = require("./admin/admin.route");
const isAdmin = require('../middleware/isAdmin')

require("../middleware/passport");

const catchError = async (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

function route(app) {
  app.use(
    "/admin",
    passport.authenticate("jwt", { session: false }), isAdmin,
    AdminRouter
  );
  app.use(passport.initialize());
  app.use("/courses", CourseRouter);
  app.use("/", GenreRouter);
  app.use("/auth", AuthenRouter);
  app.use(
    "/users",
    passport.authenticate("jwt", { session: false }),
    UserRouter
  );
  app.use(
    "/resources",
    // passport.authenticate("jwt", { session: false }),
    ResourceRouter
  );
}

module.exports = route;
