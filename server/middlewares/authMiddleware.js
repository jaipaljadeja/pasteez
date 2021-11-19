const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check if the token is present in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //get the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token
      req.user = await User.findById(decoded.id).select("-password"); //get the user from the database without password
      next(); //if the token is valid, continue
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token not found!");
  }
});

module.exports = { protect };
