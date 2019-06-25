"use strict";

const express = require("express");
const routes = express.Router();

module.exports = function(dbHelper) {
  routes.get("/", (req, res) => {
    res.render("signin");
  });

  routes.post("/", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
  });

  return routes;
};
