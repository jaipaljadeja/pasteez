const asyncHandler = require("express-async-handler");
const Paste = require("../models/pasteModel");

const getPastes = asyncHandler(async (req, res) => {
  const pastes = await Paste.find({ userId: req.user._id });
  res.json(pastes);
});

const createPaste = asyncHandler(async (req, res) => {
  const { title, encryptedCode, type } = req.body;
  if (!title || !encryptedCode || !type) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  } else {
    const paste = new Paste({
      userId: req.user._id,
      title,
      encryptedCode,
      type,
    });

    const createdPaste = await paste.save();
    res.status(201).json(createdPaste);
  }
});

const getPasteByID = asyncHandler(async (req, res) => {
  const paste = await Paste.findById(req.params.id);

  if (paste) {
    res.json(paste);
  } else {
    res.status(404).json({ message: "Paste not found" });
  }
});

const updatePaste = asyncHandler(async (req, res) => {
  const { title, encryptedCode, type } = req.body;

  const paste = await Paste.findById(req.params.id);
  if (paste.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (paste) {
    paste.title = title;
    paste.encryptedCode = encryptedCode;
    paste.type = type;

    const updatedPaste = await paste.save();
    res.json(updatedPaste);
  } else {
    res.status(401);
    throw new Error("Paste not found!");
  }
});

const deletePaste = asyncHandler(async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (paste.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (paste) {
    await paste.remove();
    res.json({ message: "Paste deleted successfully!" });
  } else {
    res.status(401);
    throw new Error("Paste not found!");
  }
});

module.exports = {
  getPastes,
  createPaste,
  getPasteByID,
  updatePaste,
  deletePaste,
};
