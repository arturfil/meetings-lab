const express = require('express');
const Meeting = require('../models/Meeting');

const router = express.Router();

router.get('/', async (req, res) => {
  const meetings = await Meeting.find();
  try {
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({message: "could not get meetings"})
  }
})

router.get('/meetings/:id', async (req, res) => {
  const {id} = req.params;
  const meeting = await Meeting.findById(id)
  try {
    return res.status(200).json(meeting);
  } catch (error) {
    return res.status(500).json({message: "Could not get the meeting"});
  }
})

router.post('/meetings', async (req, res) => {
  const meetingToPost = await Meeting.create(req.body);
  try {
    return res.status(201).json(meetingToPost);
  } catch (error) {
    return res.status(500).json({message: "Could not create meeting"});
  }
})

router.put('/meetings/:id', async (req, res) => {
  const {id} = req.params;
  const meetingToUpdate = await Meeting.findByIdAndUpdate(id);
  try {
    return res.status(202).json(meetingToUpdate);
  } catch (error) {
    return res.status(500).json({message: "Could not update meeting"});
  }
})

router.delete('/meetings/:id', async (req, res) => {
  const {id} = req.params;
  const meetingToDelete = await Meeting.findByIdAndDelete(id);
  try {
    return res.json({message: "Meeting successfully deleted"});
  } catch (error) {
    return res.status(500).json({message: "Could not delete meeting"})
  }
})

module.exports = router;