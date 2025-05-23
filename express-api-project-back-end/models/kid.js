const mongoose = require("mongoose");

const kidSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Kid = mongoose.model("Kid", kidSchema);
module.exports = Kid;
