const express = require("express");
const {
  getPosts,
  createPost,
  getPostByID,
  updatePost,
  deletePost,
} = require("../controllers/PostControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/user/:username").get(getPosts);

router.route("/create").post(protect, createPost);
router
  .route("/:id")
  .get(getPostByID)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
