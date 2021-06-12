const controller = require("./admin.controller");
const express = require("express");
const router = express.Router();

router.post("/get-courses", controller.getCourseByAdmin);
router.post("/get-users", controller.getUsersByAdmin);
router.post("/get-reviews-course", controller.getReviewsCourseByAdmin);
router.post("/edit-user", controller.editUserByAdmin);
router.post("/delete-user", controller.deleteUserByAdmin);
router.post("/accept-course", controller.acceptCourseByAdmin);
router.post("/refuse-course", controller.refuseCourse);
router.post("/delete-course-by-admin", controller.deleteCourseByAdmin);
router.post("/add-new-user-by-admin", controller.addNewUser);
router.get("/get-config", controller.getConfig);
router.post("/set-cardnumber", controller.setCardNumber);
router.post("/set-profit-ratio", controller.setProfitRatio);
router.post("/get-payment-by-admin", controller.getPaymentByAdmin);
router.post("/delete-payment-by-admin", controller.deletePaymentByAdmin);

module.exports = router;
