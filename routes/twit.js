"use strict";

const express = require("express");
const twitRoutes = express.Router();

module.exports = function(dbHelper) {
  twitRoutes.get("/all", (req, res) => {
    let twits = dbHelper.getAllTwits().then(result => {
      res.send(result);
    });
  });

  twitRoutes.post("/", (req, res) => {
    let newTwit = dbHelper.saveTwit({
      content: req.body.twit
    });
    res.status(200).json("success");
  });

  return twitRoutes;
};
