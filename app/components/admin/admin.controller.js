const db = require("../../models/db.config");
const User = db.users;
const Course = db.courses;
const Genre = db.genres;
const Subgenre = db.subGenres;
const Lecture = db.lectures;

exports.getCourseByAdmin = async (req, res, next) => {
  let condition = {};
  if (req.body.searchQuery)
    condition.name = { [Op.substring]: "%" + req.body.searchQuery + "%" };
  let sort=[];
  if (!req.body.sort) sort = ["name", "ASC"];
  else {
    switch (parseInt(req.body.sort)) {
      case 1:
        sort = ["name", "ASC"];
        break;
      case 2:
        sort = ["name", "DESC"];
        break;
    }
  }
  const data = await Course.findAll({
    where: condition,
    include: [
      { model: User, as: "lecturer", attributes: ["_id", "username"] },
      { model: Genre, as: "genre" },
      { model: Subgenre, as: "subgenre" },
      { model: Lecture, as: "lectures", attributes: ["_id", "name"] },
    ],
    limit: 8,
    order: [sort],
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.send({ code: 200, courses: data });
};
