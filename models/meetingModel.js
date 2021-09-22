const { Schema, model } = require("mongoose");

const MeetingSchema = Schema({
  concept: {
    type: String,
    required: true,
  },
  date: {
    // type: Date,
    type: String,
    required: true,
  },
  users: {
    type: [Schema.Types.ObjectId],
    // require: true,
  },

  startingTime: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
});

module.exports = model("Meeting", MeetingSchema);
