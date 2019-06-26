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
    if (req.session.user){
      let newTwit = dbHelper.saveTwit({
        user:req.session.user.name,
        content: req.body.twit
      });
      res.status(200).json("success");
    } else {
      res.status(400).json({error: "Need to login"});
    }

  });

  return twitRoutes;
};
