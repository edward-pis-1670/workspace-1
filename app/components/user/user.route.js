const express = require("express");
const controller = require("./user.controller");
const router = express.Router();
const multer = require("multer");
// const uploadcoursevideo = multer({ dest: "uploads/courses-video" });
const uploadcoursevideo = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

const uploadPreviewvideo = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// var uploadcoursephoto = multer({ dest: "public/uploads/courses-photo" });
const uploadCoursePhoto = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

const uploadavatar = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});



const catchError = async (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.get("/me", controller.getMe);
router.post("/learning", controller.getCourseByMe);
router.post("/add-review", controller.addReview);
router.post("/get-notification", controller.getNotification);
router.post("/mark-read-notification", controller.markReadNotification);
router.get("/mark-read-all-notification", controller.markAllReadNotifications);
router.get("/get-all-my-courses", controller.getAllMyCourses);
router.post("/create-course", controller.createCourse);
router.post("/view-user", controller.viewUser);
router.post("/take-a-course", controller.takeACourses);
router.post("/wishlist", controller.getMyWishlist);
router.post("/change-wishlist", controller.changeWishlist);
router.post("/get-goals-course", controller.getGoalsCourse);
router.post("/get-course", controller.getCourse);
router.post("/set-goals-course", controller.setGoalCourse);
router.post("/get-lectures-course", controller.getCourseLectures);
router.post("/add-video-lecture", controller.addVideoLectures);
router.post("/set-name-lecture", controller.setNameLecture);
router.post("/change-preview-lecture", controller.changePreview);

router.post(
  "/upload-previewvideo-lecture",
  uploadPreviewvideo.single("previewvideo"),
  controller.uploadVideoPreview
);
router.post(
  "/upload-video-lecture",
  uploadcoursevideo.single("video"),
  controller.uploadVideoLecture
);
router.post("/get-description-course", controller.getDescription);
router.post(
  "/set-description-course",
  uploadCoursePhoto.single("coverphoto"),
  controller.setDescription
);
router.post("/set-price-course", controller.setPriceCourse);
router.post("/delete-course", controller.deleteCourse);
router.post("/delete-video-lectures", controller.deleteVideoLectures);
router.post("/publish-course", controller.publishCourse);
router.post("/edit-profile", controller.editProfile);
router.post("/edit-avatar", uploadavatar.single("avatar"),controller.editAvatar);

module.exports = router;
