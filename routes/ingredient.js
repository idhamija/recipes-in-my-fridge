const express = require("express");
const passport = require("passport");
const Ingredient = require("../models/Ingredient");
require("../passport");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ingredient.findOne({ ingId: req.body.ingId }, async (err, ingredient) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Error has occured.", err });
      }

      if (ingredient) {
        const index = req.user.ingredients.indexOf(ingredient._id);
        if (index !== -1) {
          res
            .status(200)
            .json({ success: true, message: "Ingredient already exist." });
          return;
        }
      }

      if (!ingredient) {
        ingredient = await new Ingredient(req.body);
        await ingredient.save((err) => {
          if (err) {
            res
              .status(500)
              .json({ success: false, message: "Error has occured.", err });
          }
        });
      }

      req.user.ingredients.push(ingredient);
      await req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({
            success: true,
            data: ingredient,
          });
        }
      });
    });
  }
);

router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const index = req.user.ingredients.indexOf(req.params._id);
    if (index === -1) {
      res.status(200).json({
        success: true,
        message: "No ingredient with given _id",
      });
    } else {
      req.user.ingredients.splice(index, 1);
      req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Error has occured.", err });
        } else {
          res.status(200).json({
            success: true,
            message: "Ingredient removed successfully.",
          });
        }
      });
    }
  }
);

module.exports = router;
