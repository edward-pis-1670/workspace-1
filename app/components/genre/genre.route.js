const controller = require("./genre.controller");
const express = require("express");
const router = express.Router();


router.get("/genre/all", controller.getAllGenre);

module.exports = router;