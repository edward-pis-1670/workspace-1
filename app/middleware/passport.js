const db = require("../models/db.config");
const User = db.users;

const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);
// passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     (jwtPayload, done) => {
//       return User.findOne({ where: { _id: jwtPayload._id } })
//         .then((user) => {
//           return done(null, user);
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     }
//   )
// );
