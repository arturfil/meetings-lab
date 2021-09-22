//imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();

//db connection
mongoose
  .connect("mongodb://localhost/reservespot")
  .then(() => console.log("DB Connected...✅"))
  .catch(() => console.log("not working dude❌"));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//routes
app.use("/api/auth", require("./routes/user"));
app.use("/api/meetings", require("./routes/meeting"));

//listen to port
app.listen(5000, () => {
  console.log("Server up and running 😁...");
});
