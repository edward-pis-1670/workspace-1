const db = require("../../models/db.config");

const User = db.users;

exports.createUser = (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    photo: req.body.photo,
  })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};
