const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// When a user registers on the website
const registerUser = asyncHandler(async (req, res) => {
  // Get all the userinfo from the request body
  const { name, username, email, password } = req.body;

  // Finds if the username or email matches from the database
  const userExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  // Check if the user already exists in the database
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  // Registers the user in database if it doesnt exist
  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  // If registration is successful resturns the userinfo with a access token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid Email or Password!"); // Error message
  }
});

module.exports = { registerUser, authUser };
