const mongoose = require("mongoose");

const pasteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    encryptedCode: {
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
