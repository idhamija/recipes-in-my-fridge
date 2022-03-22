const express = require("express");
const passport = require("passport");
const User = require("../models/User");
require("../passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("recipes")
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({ success: true, recipes: document.recipes });
        }
      });
  }
);

router.post(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.recipes.push(req.params._id);
    req.user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Recipe added successfully." });
      }
    });
  }
);

router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const index = req.user.recipes.indexOf(req.params._id);
    if (index === -1) {
      res.status(200).json({
        success: true,
        message: "No recipe with given _id",
      });
    } else {
      req.user.recipes.splice(index, 1);
      req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({
            success: true,
            message: "Recipe removed successfully.",
          });
        }
      });
    }
  }
);

module.exports = router;
