const express = require("express");
const controller = require("./resource.controller");
const router = express.Router()


router.get("/play-video-lecturer/:lectureid", controller.playVideoLectures);
router.get("/play-video-preview-lecturer/:lectureid", controller.playVideoPreview);
module.exports = router;