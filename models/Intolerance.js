const mongoose = require("mongoose");

const IntoleranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Intolerance", IntoleranceSchema);
