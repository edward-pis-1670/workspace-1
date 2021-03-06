const controller = require("./authen.controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/verify/:jwtToken", controller.verifyAccount);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/forgot-password", controller.forgotPassword);
// router.get("/google", controller.getUrlGoogle);
router.post("/google", controller.loginGoogle);
router.post("/facebook", controller.loginFacebook);

module.exports = router;
