const controller = require("./authen.controller");
const express = require("express");
const router = express.Router();

router.get("/verify/:jwtToken", controller.verifyAccount);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/forgot-password", controller.forgotPassword);
router.get("/reset-password/:verifyToken", controller.resetPassword);

module.exports = router;