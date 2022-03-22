const express = require("express");
const passport = require("passport");
const User = require("../models/User");
require("../passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate({ path: "ingredients", options: { sort: { name: 1 } } })
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({ success: true, data: document.ingredients });
        }
      });
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const len = req.user.ingredients.length;
    req.user.ingredients.splice(0, len);

    req.user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res
          .status(200)
          .json({ success: true, message: "All ingredients cleared." });
      }
    });
  }
);

module.exports = router;
