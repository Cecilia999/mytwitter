"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();

module.exports = function(dbHelper) {
  routes.get("/", (req, res) => {
    res.render("signin");
  });

  routes.post("/", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    console.log(name);
    await dbHelper.findUser(name, (err, result) => {
      if (err) {
        res.status(400).json({ error: "fatal error" });
        throw error;
      }
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          req.session.user = {
            name: result.name
          };
          res.redirect("/");
        } else {
          res.status(400).json({ error: "invalid username or password" });
        }
      } else {
        res.status(400).json({ error: "username does not exist" });
      }
    });
  });

  return routes;
};
