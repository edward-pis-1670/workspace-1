const db = require("../../models/db.config");
const User = db.users;
const Lecture = db.lectures;
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
  // return send(req, lecture.video).pipe(res);
  res.send(data.previewvideo)
}
