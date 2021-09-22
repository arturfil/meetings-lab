const { json } = require("express");
const express = require("express");
const { validateJwt } = require("../middlewares/validateJwt");
const router = express.Router();

// GET all
router.get("/", validateJwt, async (req, res) => {
  const meetings = await Meeting.find();
  try {
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({ message: "Meetings couldn't be found" });
  }
});

// GET
router.get("/meeting/:id", async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  try {
    return res.status(200).json(meeting);
  } catch (error) {
    return res.json({ message: "Meeting couldn't be found" });
  }
});

// POST
router.post("/meeting", async (req, res) => {
  const createMeeting = await new Meeting(req.body);
  try {
    createMeeting.save();
    return res.status(201).json(createMeeting);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create meeting" });
  }
});

// PUT
router.put("/meeting/:id", async (req, res) => {
  const { id } = req.params;
  const updateMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(updateMeeting);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update meeting" });
  }
});

// DELETE
router.delete("/meeting/:id", async (req, res) => {
  const { id } = req.params;
  await Meeting.findByIdAndDelete(id);
  try {
    return res.json({ message: "Meeting deleted" });
  } catch (error) {
    return res.json({ message: "Couldn't delete meeting" });
  }
});

// MODEL - MongooseSchemas
// VIEW - React
// CONTROLLER -

module.exports = router;
