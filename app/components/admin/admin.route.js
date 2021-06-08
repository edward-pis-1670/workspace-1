const controller = require("./admin.controller")
const express = require("express");
const router = express.Router()

router.post('/get-courses', controller.getCourseByAdmin)
router.post('/get-users', controller.getUsersByAdmin)
router.post('/get-reviews-course', controller.getReviewsCourseByAdmin)
router.post('/edit-user', controller.editUserByAdmin)
// router.post('/delete-user', controller.deleteUserByAdmin)

module.exports = router