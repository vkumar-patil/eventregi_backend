const express = require("express");
const cors = require("cors");
const router = require("./Routes/userRoute");
const EventRouter = require("./Routes/EventRoute");
const connectDB = require("./Config/db"); // Import database connection function
const app = express();
require("dotenv").config();

const port = 8000;

// Call the connectDB function to establish connection with MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/Event", EventRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const router = require("./Routes/userRoute");
// const EventRouter = require("./Routes/EventRoute");
// const app = express();
// const port = 8000;
// const db = require("./Config/db");
// app.use(cors());
// app.use(express.json());
// app.use("/api/user", router);
// app.use("/api/Event", EventRouter);

// db();
// app.listen(port, () => {
//   console.log("http://localhost:8000 running");
// });
