const controller = require("./authen.controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/verify/:jwtToken", controller.verifyAccount);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/forgot-password", controller.forgotPassword);
router.get("/reset-password/:verifyToken", controller.resetPassword);
router.get("/google", controller.getUrl);
router.get("/google/callback", controller.callback);
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// router.get(
//   "google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   controller.loginByGoogle
// );

module.exports = router;
