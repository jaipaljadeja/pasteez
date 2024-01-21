const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// When a user registers on the website
const registerUser = asyncHandler(async (req, res) => {
  // Get all the userinfo from the request body
  const { name, username, email, password } = req.body;
  const profileIcon = `https://api.dicebear.com/7.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear,solid&seed=${username}`;
  // Finds if the username or email matches from the database
  const userEmailExist = await User.findOne({ email: email });
  const userUsernameExist = await User.findOne({ username: username });

  // Check if the user already exists in the database
  if (userEmailExist) {
    res.status(400);
    throw new Error("Email Already Exist");
  } else if (userUsernameExist) {
    res.status(400);
    throw new Error("Username Already Exist");
  }

  // Registers the user in database if it doesnt exist
  const user = await User.create({
    name,
    username,
    email,
    password,
    profileIcon,
  });

  // If registration is successful resturns the userinfo with a access token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id, user.username),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

// When a user wants to sign in
const authUser = asyncHandler(async (req, res) => {
  // Get the username and password from the request body
  const { email, password } = req.body;

  // Finds the user from the database
  const user = await User.findOne({ email });

  // Check if the user exists
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      profileIcon: user.profileIcon,
      about: user.about,
      token: generateToken(user._id, user.username),
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid Email or Password!"); // Error message
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).select(
    "name username about profileIcon"
  );
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profileIcon = req.body.profileIcon || user.profileIcon;
    user.about = req.body.about || user.about;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      profileIcon: updatedUser.profileIcon,
      about: updatedUser.about,
      token: generateToken(updatedUser._id, updatedUser.username),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authUser, getUserDetails, updateUserProfile };
