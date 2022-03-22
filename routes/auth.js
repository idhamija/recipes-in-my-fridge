const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
require("../passport");
require("dotenv/config");

const router = express.Router();

const signToken = (id) => {
  return jwt.sign(
    {
      iss: process.env.JWT_ISS,
      sub: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// signup, signin & signout
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, username, email } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { name, username, email },
    });
  }
);

router.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Error occured. Try again.", err });
    } else if (user) {
      res.status(400).json({
        success: false,
        message: "Username already exist. Try signing in.",
      });
    } else {
      const newUser = new User({
        username,
        name,
        email,
        password,
      });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Account created successfully." });
        }
      });
    }
  });
});

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, name, username, email } = req.user;
      const token = signToken(_id);

      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { name, username, email },
      });
    }
  }
);

router.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      user: null,
    });
  }
);

module.exports = router;
