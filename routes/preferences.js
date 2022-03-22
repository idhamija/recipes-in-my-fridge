const express = require("express");
const passport = require("passport");
const User = require("../models/User");
require("../passport");

const router = express.Router();

router.get(
  "/intolerances",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate("intolerances")
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({ success: true, data: document.intolerances });
        }
      });
  }
);

router.post(
  "/intolerance/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.intolerances.push(req.params._id);
    req.user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Intolerance added successfully." });
      }
    });
  }
);

router.delete(
  "/intolerance/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const index = req.user.intolerances.indexOf(req.params._id);
    if (index === -1) {
      res.status(200).json({
        success: true,
        message: "No intolerance with given _id",
      });
    } else {
      req.user.intolerances.splice(index, 1);
      req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({
            success: true,
            message: "Intolerance removed successfully.",
          });
        }
      });
    }
  }
);

router.get(
  "/diets",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate("diets")
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({ success: true, data: document.diets });
        }
      });
  }
);

router.post(
  "/diet/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.diets.push(req.params._id);
    req.user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Diet added successfully." });
      }
    });
  }
);

router.delete(
  "/diet/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const index = req.user.diets.indexOf(req.params._id);
    if (index === -1) {
      res.status(200).json({
        success: true,
        message: "No diet with given _id",
      });
    } else {
      req.user.diets.splice(index, 1);
      req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({
            success: true,
            message: "Diet removed successfully.",
          });
        }
      });
    }
  }
);

router.get(
  "/ignorePantry",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res.status(200).json({
          success: true,
          data: user.ignorePantry,
        });
      }
    });
  }
);

router.post(
  "/ignorePantry",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.ignorePantry = req.query.ignore;
    req.user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      } else {
        res.status(200).json({
          success: true,
          message: "Ignore Pantry changed successfully.",
        });
      }
    });
  }
);

module.exports = router;
