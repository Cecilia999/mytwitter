"use strict";

const express = require("express");
const routes = express.Router();

module.exports = function(dbHelper) {
  routes.get("/", (req, res) => {
    res.render("signin");
  });

  return routes;
};
