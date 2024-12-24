
const express = require("express");
const cors = require("cors");
const router = require("./Routes/userRoute");
const EventRouter = require("./Routes/EventRoute");
const db = require("./Config/db"); // Import database connection function
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/Event", EventRouter);

// Call the connectDB function to establish connection with MongoDB
db();

app.listen(port, () => {
  console.log("http://localhost:8000 running");
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
