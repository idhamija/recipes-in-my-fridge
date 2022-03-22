const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Intolerance = require("./Intolerance");
const Diet = require("./Diet");

// official standard (RFC 2822)
const regexEmail =
  /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 12,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: regexEmail,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  intolerances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Intolerance.modelName,
    },
  ],
  diets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Diet.modelName,
    },
  ],
  ignorePantry: {
    type: Boolean,
    default: true,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 15, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    this.password = hashedPassword;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    if (!isMatch) {
      return callback(null, null, { message: "Incorrect password." });
    }
    return callback(null, this);
  });
};

module.exports = mongoose.model("User", UserSchema);
