const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  authUser,
  getUserDetails,
  updateUserProfile,
} = require("../controllers/userControllers");

// Api for registering users
// @route   POST api/users/signup
router.route("/signup").post(registerUser);

// Api for authenticating users
// @route   POST api/users/login
router.route("/login").post(authUser);

// Api for afetching public info of users
// @route   GET api/users/:username
router.route("/:username").get(getUserDetails);

// Api for updating profile
// @route   POST api/users/profile
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
