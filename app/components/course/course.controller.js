const db = require("../../models/db.config");
const { Op } = require("sequelize");

const Genre = db.genres;
const Subgenre = db.subGenres;
const Course = db.courses;
const User = db.users;
const Lecture = db.lectures;
const Review = db.reviews;

exports.getCoursesHomepage = async (req, res) => {
  const genres = await Genre.findAll({ raw: true });
  for (const genre of genres) {
    const courses = await Course.findAll({
      where: {
        genreId: genre._id,
      },
      limit: 8,
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "lecturer",
        attributes: ["username", "photo"],
      },
    });
    genre.courses = courses;
  }

  res.json({
    code: 200,
    listCourses: genres,
  });
};

exports.createNewCourse = (req, res) => {
  Course.create({
    name: req.body.name,
    description: req.body.description,
    coverPhoto: req.body.coverPhoto,
    cost: req.body.cost,
    previewvideo: req.body.previewvideo,
    public: req.body.public,
    levelId: req.body.levelId,
    _id: req.body._id,
    userId: req.body.userId,
    star: req.body.star,
    genreId: req.body.genreId,
    subGenreId: req.body.subGenreId,
  })
    .then((newCourse) => {
      res.send(newCourse);
    })
    .catch((err) => console.log(err));
};

exports.getCourseByGenre = async (req, res) => {
  const genre = await Genre.findOne({
    where: { _id: req.params.genreid },
    raw: true,
  });
  const subgenres = await Subgenre.findAll({
    where: { genreId: genre._id },
    attributes: ["_id", "name"],
    raw: true,
  });
  const data = [];
  for (const subgenre of subgenres) {
    const courses = await Course.findAll({
      where: {
        subGenreId: subgenre._id,
      },
      limit: 8,
      include: {
        model: User,
        as: "lecturer",
        attributes: ["photo", "username"],
      },
      attributes: [
        "description",
        "coverphoto",
        "cost",
        "numberofstudent",
        "numberofreviews",
        "_id",
        "name",
        "star",
      ],
    });
    subgenre.courses = courses;
    data.push(subgenre);
  }
  res.json({
    code: 200,
    genre: genre,
    listCourses: data,
  });
};

exports.getInfoCourse = async (req, res) => {
  const data = await Course.findOne({
    where: {
      _id: req.body.courseid,
    },
    include: [
      {
        model: Subgenre,
        as: "subgenre",
        attributes: ["_id", "name"],
      },
      {
        model: User,
        as: "lecturer",
        attributes: [
          "photo",
          "_id",
          "username",
          "biography",
          "linkedin",
          "twitter",
          "website",
          "youtube",
        ],
      },
      {
        model: Genre,
        as: "genre",
        attributes: ["_id", "name"],
      },
      {
        model: Lecture,
        as: "lectures",
        attributes: ["_id", "preview", "video", "name"],
      },
    ],
    attributes: [
      "_id",
      "willableto",
      "name",
      "description",
      "coverphoto",
      "previewvideo",
      "cost",
      "revenue",
      "star",
      "review",
      "public",
      "numberofstudent",
      "numberofreviews",
      "targetstudent",
      "needtoknow",
      "createdAt",
      "updatedAt",
    ],
  });
  res.json({
    code: 200,
    message: "success",
    course: data,
  });
};

exports.getCourseBySubgenre = async (req, res) => {
  const data = await Subgenre.findOne({
    where: {
      _id: req.params.subgenreid,
    },
    include: [
      {
        model: Course,
        as: "subgenre",
        limit: 8,
        attributes: [
          "cost",
          "coverphoto",
          "description",
          "name",
          "numberofstudent",
          "numberofreviews",
        ],
        include: {
          model: User,
          as: "lecturer",
          attributes: ["_id", "username"],
        },
      },
      {
        model: Genre,
        as: "subgenres1",
      },
    ],
  });
  res.json({
    code: 200,
    genre: data.subgenres1,
    subgenre: {
      _id: data._id,
      name: data.name,
    },
    courses: data.subgenre,
  });
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      courseId: req.body.courseid,
    },
    attributes: ["star", "createdAt", "content"],
    include: {
      model: User,
      as: "user",
      attributes: ["_id", "photo", "username"],
    },
  });
  res.json({
    code: 200,
    reviews: reviews,
  });
};

exports.getCoursesRelatedLecturer = async (req, res) => {
  const data = await Course.findAll({
    where: {
      userId: req.body.lecturerid,
      _id: {
        [Op.not]: req.body.courseid,
      },
      public: true,
    },
    include: {
      model: User,
      as: "lecturer",
      attributes: ["_id", "username", "photo"],
    },
    attributes: [
      "cost",
      "coverphoto",
      "description",
      "name",
      "numberofstudent",
      "numberofreviews",
      "star",
      "_id",
    ],
  });

  res.json({
    code: 200,
    courses: data,
  });
};

exports.searchCourse = async (req, res) => {
  let condition = { public: true };
  if (req.body.level) condition.level = req.body.level;
  if (req.body.free)
    condition.cost = req.body.free == "true" ? 0 : { [Op.gt]: 0 };
  if (req.body.name) condition.name = { [Op.substring]: "%" + req.body.name + "%" };
  let sort;
  if (!req.body.sort) sort = ["numberofstudent", "DESC"];
  else {
    switch (parseInt(req.body.sort)) {
      case 1:
        sort = ["numberofstudent", "DESC"];
        break;
      case 2:
        sort = ["star", "DESC"];
        break;
      case 3:
        sort = ["createdAt", "DESC"];
        break;
      case 4:
        sort = ["cost", "DESC"];
        break;
      case 5:
        sort = ["cost", "ASC"];
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
