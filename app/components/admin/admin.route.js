const controller = require("./admin.controller")
const express = require("express");
const router = express.Router()

router.post('/get-courses', controller.getCourseByAdmin)
router.post('/get-users', controller.getUsersByAdmin)
router.post('/get-reviews-course', controller.getReviewsCourseByAdmin)
router.post('/edit-user', controller.editUserByAdmin)
router.post('/delete-user', controller.deleteUserByAdmin)
router.post('/accept-course', controller.acceptCourseByAdmin)
router.post('/add-new-user-by-admin', controller.addNewUser)

module.exports = router