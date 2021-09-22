const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//db connections
mongoose
  .connect("mongodb://localhost/reservespot")
  .then(() => console.log("Connected to DB 🔌"))
  .catch(() => console.log("Could not connect to DB 🖕"));

//general middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/users/auth", require("./routes/userRoute"));
app.use("/api/meetings", require("./routes/meetingRoute"));

//listen to port
app.listen(5000, () => {
  console.log("Server up and running :D ✨");
});
