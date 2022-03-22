const express = require("express");
const Intolerance = require("../models/Intolerance");
const Diet = require("../models/Diet");

const router = express.Router();

router.get("/intolerances", (req, res) => {
  Intolerance.find().exec((err, intolerances) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Error has occured.", err });
    } else {
      res.status(200).json({ success: true, data: intolerances });
    }
  });
});

router.get("/diets", (req, res) => {
  Diet.find().exec((err, diets) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Error has occured.", err });
    } else {
      res.status(200).json({ success: true, data: diets });
    }
  });
});

module.exports = router;
