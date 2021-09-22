const express = require("express");
const router = express.Router();
const Meetings = require("../models/Meeting");

//get all meetings
router.get("/", async (req, res) => {
  const meetings = await Meetings.find();
  try {
    return res.status(200).json(meetings);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve meetings", error });
  }
});

//get single meeting
router.get("/meeting/:id", async (req, res) => {
  const { id } = req.params;
  const singleMeeting = await Meetings.findById(id);
  try {
    return res.status(200).json(singleMeeting);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve single meeting", error });
  }
});

//POST meeting
router.post("/meeting", async (req, res) => {
  const meetingToCreate = await Meetings.create(req.body);
  try {
    return res.status(201).json(meetingToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Could not create meeting", error });
  }
});

//PUT meeting
router.put("/meeting/:id", async (req, res) => {
  const meetingToUpdate = await Meetings.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(203).json(meetingToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Could not update meeting", error });
  }
});

//DELETE meeting
router.delete("meeting/:id", async (req, res) => {
  const { id } = req.params;
  await Meetings.findByIdAndDelete(id);
  try {
    return res.json({ message: "Meeting successfully deleted" });
  } catch (error) {
    return res.json({ message: "Could not delete meeting", error });
  }
});

module.exports = router;
