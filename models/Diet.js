const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Diet", DietSchema);
