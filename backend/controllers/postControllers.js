const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ username: req.params.username });
  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { caption, encryptedCode } = req.body;
  if (!caption || !encryptedCode) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  } else {
    const post = new Post({
      username: req.user.username,
      caption,
      encryptedCode,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  }
});

const getPostByID = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { caption, encryptedCode } = req.body;

  const post = await Post.findById(req.params.id);
  if (post.username !== req.user.username) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (post) {
    post.caption = caption;
    post.encryptedCode = encryptedCode;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(401);
    throw new Error("Post not found!");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.username !== req.user.username) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (post) {
    await post.remove();
    res.json({ message: "Post deleted successfully!" });
  } else {
    res.status(401);
    throw new Error("Post not found!");
  }
});

module.exports = {
  getPosts,
  createPost,
  getPostByID,
  updatePost,
  deletePost,
};
