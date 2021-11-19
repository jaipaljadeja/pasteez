const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    caption: {
      type: String,
      required: true,
    },
    encryptedCode: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
