const db = require("../../models/db.config");
const User = db.users;
const Lecture = db.lectures;
const Course = db.courses
const send = require("send");
exports.playVideoLectures = async (req, res) => {
  const data = await Lecture.findOne({
    where: { _id: req.params.lectureid },
  });
  // return send(req, lecture.video).pipe(res);
  res.send(data.video)
};

exports.playVideoPreview = async (req, res) => {
  const data = await Course.findOne({
    where: { _id: req.params.courseid },
  });
  res.send(data.previewvideo)
}


exports.getImage = async (req, res) => {
  res.redirect(req.query.src);
}