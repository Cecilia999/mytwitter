"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const routes = express.Router();

module.exports = function(dbHelper) {
  routes.get("/", (req, res) => {
    res.render("signup");
  });

  routes.post("/", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    await dbHelper.findUser(name, (err, result) => {
      console.log("signup: looking for existing user result:", result);
      if (!result) {
        dbHelper.createUser(
          {
            name: name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(11))
          },
          (err, re) => {
            console.log("signup result:", re);
            if (!re) {
              req.session.user = {
                name
              };
              res.redirect("/");
            } else {
              res.status(404).send("User register fail");
            }
          }
        );
      } else {
        res.status(404).send("User exist");
      }
    });
  });

  return routes;
};
