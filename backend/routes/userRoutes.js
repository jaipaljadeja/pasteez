const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userControllers");

// Api for registering users
// @route   POST api/users/
router.route("/").post(registerUser);

// Api for authenticating users
// @route   POST api/users/login
router.route("/login").post(authUser);

module.exports = router;
