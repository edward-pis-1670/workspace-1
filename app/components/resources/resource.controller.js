const db = require("../../models/db.config");
const User = db.users;
const Lecture = db.lectures;
const send = require("send");
exports.playVideoLectures = async (req, res) => {
  const lecture = await Lecture.findOne({
    where: { _id: req.params.lectureid },
  });
  // return send(req, lecture.video).pipe(res);
  res.send(lecture.video)
};
