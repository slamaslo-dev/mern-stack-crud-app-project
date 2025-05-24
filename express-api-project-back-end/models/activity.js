const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  kid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kid",
    required: true,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
    required: true,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
