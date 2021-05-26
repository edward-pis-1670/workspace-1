const express = require("express");
const controller = require("./user.controller");
const router = express.Router();

router.get("/me", controller.getMe);
router.post("/learning", controller.getCourseByMe);

module.exports = router;