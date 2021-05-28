const db = require("../../models/db.config");
const User = db.users;
const Course = db.courses;
const { Op } = require("sequelize");

exports.getMe = async (req, res) => {
  const user = await User.findOne({
    where: { _id: req.user._id },
    include: {
      model: Course,
      as: "mylearningcourses",
      attributes: ["_id"],
    },
  });

  res.send({
    user,
    code: 200,
    message: "success",
  });
};

exports.getCourseByMe = async (req, res) => {
  const user = await User.findOne({
    where: { _id: req.user._id },
    include: {
      model: Course,
      as: "mylearningcourses",
      attributes: ["_id"],
    },
  });
  let mylearningcourses = [];
  user.mylearningcourses.map((mycourse) => {
    mylearningcourses.push(mycourse._id);
  });
  let condition = { _id: { [Op.in]: mylearningcourses }, public: true };
  if (req.body.level) condition.level = req.body.level;
  if (req.body.free)
    condition.cost = req.body.free == "true" ? 0 : { [Op.gt]: 0 };
  if (req.body.name) condition.name = { [Op.like]: "%" + req.body.name + "%" };
  let sort;
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
    include: {
      model: User,
      as: "lecturer",
      attributes: ["_id", "username", "photo"],
    },
    attributes: [
      "_id",
      "name",
      "coverphoto",
      "cost",
      "numberofstudent",
      "numberofreviews",
      "star",
      "description",
    ],
    limit: 8,
    offset: (req.body.page || 1) * 8 - 8,
  });
  res.json({
    code: 200,
    courses: data,
  });
};

exports.getAllMyCourses = async (req, res) => {
  const data = await Course.findAll({
    where: { userId: req.user._id },
  });
  res.end(JSON.stringify(data));
};

exports.createCourse = async (req, res) => {
  const newCourse = Course.build({
    name: req.body.coursename,
    userId: req.user._id,
  });
  await newCourse
    .save()
    .then(() => res.send({ code: 200, message: "success", course: newCourse }))
    .catch((err) => res.send({ code: 404, message: "error" }));
};


exports.takeACourses = async (req, res) => {
  const user = await User.findOne({
    where: { _id: req.user._id },
    include: {
      model: Course,
      as: "mylearningcourses",
      attributes: ["_id"],
    },
  });
  let mylearningcourses = [];
  user.mylearningcourses.map((mycourse) => {
    mylearningcourses.push(mycourse._id);
  });
  if (mylearningcourses.includes(JSON.stringify(req.body.courseid), req.body.courseid)) {
    return res.send({ code: 404, message: 'error' })
  } else {
    Course.findOne({
      where:
      {_id:req.body.courseid},
      include:{
        model:User,
        as:"lecturer",
        attributes: ["_id"]
      }
    }).then(course => {
      if(!course) return res.send({ code: 404, message:"error"})
      if(req.user.creditbalance < course.cost) {
        return res.send({code:404, message:"The credit balance is not enough to make payments"})
      }
      User.findOne({where:{_id:req.user._id}}).then(newUser => {
        course.addUser(newUser)
      })
      res.json("result")
    }).catch(err => {
      console.log(err)
    })
  }
}


