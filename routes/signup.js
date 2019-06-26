"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const routes = express.Router();

module.exports = function(dbHelper) {
  routes.get("/", (req, res) => {
    res.render("signup");
  });

  routes.post("/", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    let newUser = dbHelper
      .createUser({
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      })
    newUser ? newUser.then(result => {res.redirect("/")}) : res.status(404).end();
  });

  return routes;
};
