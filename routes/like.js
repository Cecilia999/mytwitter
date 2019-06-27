"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const routes = express.Router();

module.exports = function(dbHelper) {
  routes.post("/", (req, res) => {
    console.log("clicked like" + req.body.twit_id);
    if (req.session.user) {
      dbHelper.likeTwit(req.body.twit_id);
      res.status(200).json("success");
    } else {
      res.status(400).json({ error: "Need to login" });
    }
  });

  return routes;
};
