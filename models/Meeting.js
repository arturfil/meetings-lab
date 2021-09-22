const {Schema, model} = require('mongoose');

const MeetingSchema = Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
    date: {
      type: Date,
      required: true
    },
    startingTime: {
      type: String, 
      required: [true, "You need to select a starting time"]
    },
    users: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    duration: {
      type: Number,
      required: [true, 'You need to specify how long will the meeting last']
    }
  }
)

module.exports = model('Meetings', MeetingSchema);