const express = require("express");
const controller = require("./user.controller");
const router = express.Router();

router.get("/me", controller.getMe);
router.post("/learning", controller.getCourseByMe);
router.get("/get-all-my-courses", controller.getAllMyCourses);
router.post("/create-course", controller.createCourse);
router.post("/take-a-course", controller.takeACourses);

module.exports = router;


