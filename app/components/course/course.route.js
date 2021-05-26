const controller = require("./course.controller");
const express = require("express");
const router = express.Router();

router.post("/get-info-course", controller.getInfoCourse);
router.post("/get-reviews", controller.getReviews);
router.get("/get-courses-homepage", controller.getCoursesHomepage);
router.post("/create", controller.createNewCourse);
router.post(
  "/get-course-by-subgenre/:subgenreid",
  controller.getCourseBySubgenre
);
router.get("/get-courses-by-genre/:genreid", controller.getCourseByGenre);
router.post("/search", controller.searchCourse);
router.post(
  "/get-courses-relate-lecturer",
  controller.getCoursesRelatedLecturer
);

module.exports = router;
