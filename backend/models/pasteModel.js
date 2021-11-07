const mongoose = require("mongoose");

const pasteSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
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

const Paste = mongoose.model("Paste", pasteSchema);

module.exports = Paste;
