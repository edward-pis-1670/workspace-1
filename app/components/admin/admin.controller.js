const db = require("../../models/db.config");
const User = db.users;
const Course = db.courses;
const Genre = db.genres;
const Subgenre = db.subGenres;
const Lecture = db.lectures;
const Payment = db.payments;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const fs = require("fs");

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
    condition[Op.or] = [
      {
        username: { [Op.like]: "%" + req.body.searchQuery + "%" },
      },
      {
        email: { [Op.like]: "%" + req.body.searchQuery + "%" },
      },
    ];
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
  const datas = await User.findAll({
    where: condition,
    limit: 8,
    order: [sort],
    offset: (req.body.page || 1) * 8 - 8,
  });
  datas.map((data) => {
    data.photo = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${data.photo}/200_200.png`;
  });
  res.send({ code: 200, users: datas });
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
      { model: Genre, as: "genre", attributes: ["_id", "name"] },
      { model: Subgenre, as: "subgenre", attributes: ["_id", "name"] },
      { model: Lecture, as: "lectures", attributes: ["_id", "name"] },
    ],
    limit: 8,
    order: [sort],
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.send({ code: 200, courses: data });
};

exports.editUserByAdmin = async (req, res) => {
  await User.update(
    {
      username: req.body.username,
      email: req.body.email,
      verified: true,
      role: req.body.role,
      creditbalance: req.body.creditbalance,
      website: req.body.website,
      linkedin: req.body.linkedin,
      youtube: req.body.youtube,
      twitter: req.body.twitter,
    },
    { where: { _id: req.body._id } }
  );
  res.send({ code: 200 });
};

exports.deleteUserByAdmin = async (req, res) => {
  await User.destroy({ where: { _id: req.body._id } });
  res.send({ code: 200 });
};

exports.acceptCourseByAdmin = async (req, res) => {
  await Course.update(
    { review: false, public: true },
    { where: { _id: req.body._id } }
  );
  res.send({ code: 200 });
};

exports.addNewUser = async (req, res) => {
  const result = await User.findOne({ where: { email: req.body.email } });
  if (result) {
    return res.send({ code: 401, message: "User is already registered" });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      verified: true,
      role: req.body.role,
      creditbalance: req.body.creditbalance,
      website: req.body.website,
      linkedin: req.body.linkedin,
      youtube: req.body.youtube,
      twitter: req.body.twitter,
    });
  }

  res.send({ code: 200, message: "success" });
};

exports.refuseCourse = async (req, res) => {
  await Course.update(
    { review: false, public: false },
    { where: { _id: req.body._id } }
  );
  res.send({ code: 200, message: "success" });
};

exports.deleteCourseByAdmin = async (req, res) => {
  await Course.destroy({ where: { _id: req.body._id } });
  res.send({ code: 200, message: "success" });
};

exports.getConfig = async (req, res) => {
  fs.readFile("config.json", (err, data) => {
    if (err) res.send({ code: 404 });
    let config = JSON.parse(data.toString());
    res.send({
      code: 200,
      cardnumber: config.CARD_NUMBER,
      totalprofit: config.TOTAL_PROFIT,
      profitratio: config.PROFIT_RATIO,
    });
  });
};

exports.setCardNumber = async (req, res) => {
  fs.readFile("config.json", (err, data) => {
    if (err) res.send({ code: 404 });
    let config = JSON.parse(data.toString());
    config.CARD_NUMBER = req.body.cardnumber;
    fs.writeFile("config.json", JSON.stringify(config), (err) => {
      res.send({ code: 200, cardnumber: req.body.cardnumber });
    });
  });
};

exports.setProfitRatio = async (req, res) => {
  fs.readFile("config.json", (err, data) => {
    if (err) res.send({ code: 404 });
    let config = JSON.parse(data.toString());
    config.PROFIT_RATIO = parseFloat(req.body.profitratio);
    fs.writeFile("config.json", JSON.stringify(config), (err) => {
      res.send({ code: 200, profitratio: req.body.profitratio });
    });
  });
};

exports.getPaymentByAdmin = async (req, res) => {
  const data = await Payment.findAll({
    where: { userId: req.user._id },
    include: { model: User, as: "user", attributes: ["username", "_id"] },
    limit: 8,
    order: [["createdAt", req.body.sort == 0 ? "DESC" : "ASC"]],
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.send({ code: 200, payments: data });
};

exports.deletePaymentByAdmin = async (req, res) => {
  await Payment.destroy({ where: { _id: req.body._id } });
  res.send({ code: 200, message: "success" });
};
