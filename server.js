const express = require("express");
const cors = require("cors");
const router = require("./Routes/userRoute");
const EventRouter = require("./Routes/EventRoute");
const connectDB = require("./Config/db"); // MongoDB connection function
require("dotenv").config(); // Load environment variables

const app = express();
const port = 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", router);
app.use("/api/Event", EventRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
