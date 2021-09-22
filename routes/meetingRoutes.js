const express = require("express");
const router = express.Router();

const Meeting = require("../models/meetingModel");

//create
router.post("/create", async (req, res) => {
  const newMeeting = await Meeting.create(req.body);
  try {
    return res.status(201).json(newMeeting);
  } catch (error) {
    return res.status(500).json({ message: "couldnt create metting" });
  }
});

//read
router.get("/all", async (req, res) => {
  const allMeetings = await Meeting.find();
  try {
    return res.status(201).json(allMeetings);
  } catch (error) {
    return res.status(500).json({ message: "couldnt get mettings" });
  }
});

//update
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newMeeting = await Meeting.findByIdAndUpdate(id, req.body);
  try {
    return res.status(201).json(newMeeting);
  } catch (error) {
    return res.status(500).json({ message: "couldnt update metting" });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Meeting.findByIdAndDelete(id);
  try {
    return res.status(201).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: "couldnt delete metting" });
  }
});

module.exports = router;
