const express = require('express')
const { validateJwt } = require('../middlewares/validateJwt')
const router = express.Router()

const Meeting = require('../models/Meeting');

// GET all meetings
router.get('/', validateJwt, async (req, res) => {
  const meetings = await Meeting.find();
  try {
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({message: "Could not get the meetings"})
  }
})

// GET single meeting
router.get('/meeting/:id', async (req, res) => {
  const { id } = req.params;
  const singleMeeting = await Meeting.findById(id);
  try {
    return res.status(201).json(singleMeeting);
  } catch (error) {
    return res.status(500).json({message: "Couldn't find meeting"});
  }
})

// POST meeting
router.post('/meeting', async (req, res) => {

  const meetingToCreate = await Meeting.create(req.body);

  try {
    return res.status(201).json(meetingToCreate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the meeting"});
  }
})

// PUT category
router.put('/meeting/:id', async (req, res) => {
  const {id} = req.params;
  const meetingToUpdate = await Meeting.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(meetingToUpdate);
  } catch (error) {
    return res.status(500).json("Error, couldn't update the meeting");
  }
})

// DELETE categroy
router.delete('/meeting/:id', async (req, res) => {
  const { id } = req.params;
  await Meeting.findByIdAndDelete(id);
  try {
    return res.json({message: 'Meeting successfully deleted'})
  } catch (error) {
    return res.status(500).json({message: 'Meeting was not deleted, check server'})
  }
})

module.exports = router