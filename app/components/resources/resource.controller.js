const db = require("../../models/db.config");
const User = db.users;
const Lecture = db.lectures;
const send = require("send");
exports.playVideoLectures = async (req, res) => {
//   const user = await User.findOne({ _id: req.user._id });
//   if (!user) {
//     return res.end();
//   }
await Lecture.findOne({ _id: req.params.lectureid }).then((lecture) => {
    return send(req, lecture.video).pipe(res);
}).catch((err) =>console.log(err))
};
