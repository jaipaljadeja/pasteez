const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const pasteRoutes = require("./routes/pasteRoutes");
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
app.use("/api/users", userRoutes);
app.use("/api/pastes", pasteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
