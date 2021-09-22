const {Schema, model, SchemaType} = require('mongoose');

const MeetingSchema = Schema(
  {
    concept: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    startingTime: {
      type: String,
      required: true
    },
    users: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  }
)

module.exports = model('Meetings', MeetingSchema)