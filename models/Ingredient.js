const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  ingId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  aisle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
