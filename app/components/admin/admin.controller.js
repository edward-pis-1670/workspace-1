const db = require("../../models/db.config");
const User = db.users;
const Course = db.courses;
const Genre = db.genres;
const Subgenre = db.subGenres;
const Lecture = db.lectures;
const { Op } = require("sequelize");

exports.getCourseByAdmin = async (req, res, next) => {
  let condition = {};
  if (req.body.searchQuery)
    condition.name = { [Op.substring]: "%" + req.body.searchQuery + "%" };
  let sort = [];
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

exports.getUsersByAdmin = async (req, res, next) => {
  let condition = {};
  if (req.body.searchQuery) {
    condition.username = {
      [Op.substring]: "%" + req.body.searchQuery + "%",
    };
    condition.email = {
      [Op.substring]: "%" + req.body.searchQuery + "%",
    };
  }
  let sort = [];
  if (!req.body.sort) sort = ["username", "ASC"];
  else {
    switch (parseInt(req.body.sort)) {
      case 1:
        sort = ["username", "ASC"];
        break;
      case 2:
        sort = ["username", "DESC"];
        break;
    }
  }
  const data = await User.findAll({
    // where: { [Op.or]:condition },
    where: condition,
    limit: 8,
    order: [sort],
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.send({ code: 200, users: data });
};

exports.getReviewsCourseByAdmin = async (req, res, next) => {
  let condition = { review: true };
  if (req.body.searchQuery) {
    condition.name = {
      [Op.substring]: "%" + req.body.searchQuery + "%",
    };
  }
  let sort = [];
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
      { model: Genre, as: "genre" , attributes: ["_id", "name"]},
      { model: Subgenre, as: "subgenre",attributes: ["_id", "name"] },
      { model: Lecture, as: "lectures", attributes: ["_id", "name"] },
    ],
    limit: 8,
    order: [sort],
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.send({code: 200, courses: data})
};


exports.editUserByAdmin = async (req, res) => {
  await User.update({username: req.body.username,
    email: req.body.email,
    verified: true,
    role: req.body.role,
    creditbalance: req.body.creditbalance,
    website: req.body.website,
    linkedin: req.body.linkedin,
    youtube: req.body.youtube,
    twitter: req.body.twitter}, {where:{_id:req.body._id}})
    res.send({code:200})
}

exports.deleteUserByAdmin = async (req, res) => {
await User.destroy({where:{_id:req.body._id}})
res.send({code:200})
}
