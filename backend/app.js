const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");
const cors = require("cors");
const userAPI = require("./routes/checkuser");
const taskAPI = require("./routes/checkTask");
app.use(cors());
app.use(express.json());

app.use("/api/v1", userAPI);
app.use("/api/v2", taskAPI);

//Localhost:3000/api/v1/signin
app.use("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
