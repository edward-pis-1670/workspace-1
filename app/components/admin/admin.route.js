const controller = require("./admin.controller")
const express = require("express");
const router = express.Router()

router.post('/get-courses', controller.getCourseByAdmin)

module.exports = router