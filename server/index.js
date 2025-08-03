const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const pasteRoutes = require("./routes/pasteRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 5000;
// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>> USERS Routes API Endpoints <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use("/api/users", userRoutes);

// --------------------- @POST /api/users/signup ---------------------
// --> Description: create a new user account
// --> Authorization required?: false
// --> Body:
// {
//   "name": "Jaipal Jadeja",
//   "username": "jaipaljadeja",
//   "email": "abc@gmail.com",
//   "password": "12345"
// }

// --------------------- @POST /api/users/login ---------------------
// --> Description: logs in user
// --> Authorization required?:false
// --> Body:
// {
//   "email": "jadejajaipal5@gmail.com",
//   "password": "jaipal"
// }

// --------------------- @GET /api/users/:username ---------------------
// --> Description: gives public details of a user
// --> Authorization required?:false
// --> Body: None
// --> Returns: {"_id", "name", "username", "about", "profileIcon"}

// --------------------- @POST /api/users/profile ---------------------
// --> Description: updates the profile of the user
// --> Authorization required?:true
// --> Body: { "name", "email", "profileIcon", "about"}
// --> Returns: updated userInfo

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>> PASTES Routes API Endpoints <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use("/api/pastes", pasteRoutes);

// --------------------- @GET /api/pastes/ ---------------------
// --> Description: Get all pastes of a user
// --> Authorization required?: true
// --> Body: none
// --> Returns: [{"_id", "username", "title", "encryptedCode", "lang"}, ...]

// --------------------- @POST /api/pastes/create ---------------------
// --> Description: create a paste for a user
// --> Authorization required?: true
// --> Body:
// {
//   "title": "My third public paste",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY=",
//   "lang": "javascript"
// }
// --> Returns: {"_id", "username", "title", "encryptedCode", "lang"}

// --------------------- @GET /api/pastes/:id ---------------------
// --> Description: get a specific paste of a user
// --> Authorization required?: true
// --> Body: none
// --> Returns: {"_id", "username", "title", "encryptedCode", "lang"}

// --------------------- @PUT /api/pastes/:id ---------------------
// --> Description: updates a specific paste of a user
// --> Authorization required?: true
// --> Body:
// {
//   "title": "This title has been updated by user",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
//   "lang": "javascript"
// }
// --> Returns: { "message" }

// --------------------- @DELETE /api/pastes/:id ---------------------
// --> Description: deletes a specific paste of a user
// --> Authorization required?: true
// --> Body: None
// --> Returns: { "message" }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>> POSTS Routes API Endpoints <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use("/api/posts", postRoutes);

// --------------------- @GET /api/posts/user/:username ---------------------
// --> Description: Get all posts of a user
// --> Authorization required?: false
// --> Body: none

// --------------------- @POST /api/posts/create ---------------------
// --> Description: create a post for a user
// --> Authorization required?: true
// --> Body:
// {
//   "caption": "My first post",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
//   "lang": "javascript"
// }
// --> Returns: [{"_id", "username", "caption", "encryptedCode", "lang"}, ...]

// --------------------- @GET /api/posts/:id ---------------------
// --> Description: get a specific post for a user
// --> Authorization required?: false
// --> Body: none
// --> Returns: {"_id", "username", "caption", "encryptedCode", "lang"}

// --------------------- @PUT /api/posts/:id ---------------------
// --> Description: update the post of a user
// --> Authorization required?: true
// --> Body:
// {
//   "caption": "My first post",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
//   "lang": "javascript"
// }
// --> Returns: { "message" }

// --------------------- @DELETE /api/posts/:id ---------------------
// --> Description: delete the post of a user
// --> Authorization required?: true
// --> Body: none
// --> Returns: { "message" }

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
