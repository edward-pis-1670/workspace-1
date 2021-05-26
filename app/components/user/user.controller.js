const db = require("../../models/db.config");
const User = db.users;
const Course = db.courses

exports.getMe = async (req, res) => {
  const user = await User.findOne({ 
    where: { _id: req.user._id },
    include:{
      model: Course,
      as:"mylearningcourses",
      attributes:["_id"],
    }

   });

  res.send({
    user,
    code: 200,
    message:"success"
  });
};


exports.getCourseByMe = async (req, res) => {
  let condition = { public: true };
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
}