"use strict";

const express = require("express");
const twitRoutes = express.Router();

module.exports = function(dbHelper) {
  twitRoutes.get("/all", (req, res) => {
    let twits = dbHelper.getAllTwits(result => {
      console.log(result);
      res.send(result);
    });
  });

  twitRoutes.post("/", (req, res) => {
    if (req.session.user) {
      dbHelper.saveTwit({
        user: req.session.user.name,
        content: req.body.twit,
        likecount: 0,
        created_at: Date.now()
      });
      res.status(200).json("success");
    } else {
      res.status(400).json({ error: "Need to login" });
    }
  });

  return twitRoutes;
};
