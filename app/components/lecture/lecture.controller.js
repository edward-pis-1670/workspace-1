const db = require("../../models/db.config");
const Lecture = db.lectures;

exports.createLecture = (req, res) => {
  Lecture.create({
    name: req.body.name,
    video: req.body.video,
    preview: req.body.preview,
    courseId: req.body.courseId,
  })
    .then((lecture) => {
      res.send(lecture);
    })
    .catch((err) => {
      console.log(err);
    });
};
