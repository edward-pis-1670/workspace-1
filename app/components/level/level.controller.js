const db = require("../../models/db.config");
const Level = db.levels;

exports.createLevel = (req, res) => {
  Level.create({
    name: req.body.name,
  })
    .then((level) => {
      res.send(`Create successfully ${level.name}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
