const express = require("express");
const controller = require("./resource.controller");
const router = express.Router()


router.get("/play-video-lecturer/:lectureid", controller.playVideoLectures);
module.exports = router;