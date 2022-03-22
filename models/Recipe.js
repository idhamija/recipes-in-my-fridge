const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recId: {
    type: Number,
    required: true,
  },
  title: String,
  image: String,
  calories: Number,
  time: Number,
  summary: String,
  missingCount: Number,
  sourceUrl: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
