// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// db connectioon
mongoose
  .connect("mongodb://localhost/reservespot")
  .then(() => console.log("db connected... "))
  .catch(() => console.log("could not connect"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/meetings", require("./routes/meetingRoutes"));

//listen to port
app.listen(5000, () => {
  console.log("all good bro :D");
});
