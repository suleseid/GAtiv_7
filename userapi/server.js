const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postsRoutes");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.MONGO_URI
).then(() => console.log("Connected to DB"))
 .catch((err) => console.log(err));

// Middleware to parse JSON requests
app.use(express.json());

// CORS Middleware
app.use(cors()); // Allow all origins

// Route middlewares
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3001, () => console.log("Server is up and running on port 3001"));
