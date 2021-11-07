const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const pasteRoutes = require("./routes/pasteRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 4000;
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

// --------------------- @POST /api/pastes/create ---------------------
// --> Description: create a paste for a user
// --> Authorization required?: true
// --> Body:
// {
//   "title": "My third public paste",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
// }

// --------------------- @GET /api/pastes/:id ---------------------
// --> Description: get a specific paste of a user
// --> Authorization required?: true
// --> Body: none

// --------------------- @PUT /api/pastes/:id ---------------------
// --> Description: updates a specific paste of a user
// --> Authorization required?: true
// --> Body:
// {
//   "title": "This title has been updated by user",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
// }

// --------------------- @DELETE /api/pastes/:id ---------------------
// --> Description: deletes a specific paste of a user
// --> Authorization required?: true
// --> Body: None

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
// }

// --------------------- @GET /api/posts/:id ---------------------
// --> Description: get a specific post for a user
// --> Authorization required?: false
// --> Body: none

// --------------------- @PUT /api/posts/:id ---------------------
// --> Description: update the post of a user
// --> Authorization required?: true
// --> Body:
// {
//   "caption": "My first post",
//   "encryptedCode": "R1FXTDY2VzViWTFLOG53NTFTYU9xY0ZlTm9pUnBydllNVlpKdGNpOE5DNXdzNXRrYVE2anpQYUlSQVIyRElEZVUrdDY="
// }

// --------------------- @DELETE /api/posts/:id ---------------------
// --> Description: delete the post of a user
// --> Authorization required?: true
// --> Body: none

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
