const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.post("/signup", body("email").isEmail(), userController.createUser);

router.post("/login", body("email").isEmail(), userController.loginUser);

module.exports = router;
