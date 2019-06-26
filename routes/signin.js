"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
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
    dbHelper.findUser(name).then((result)=>{
      if (result.length!=0) {
        if(bcrypt.compareSync(password, result.password)){
          req.session.user = {
            name: result.name,
            password: result.password
          }
          res.redirect('/');
        }else{
            return "invalid username or password";
        }
      }else{
          return "username does not exist";
      }
    }).catch((error)=>{
        console.log("fatal error");
    });
  });

  return routes;
};
