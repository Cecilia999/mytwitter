const PORT = 8080;

//Define Section:
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const { MongoClient } = require("mongodb");
//Initialization Section:
const app = express();

MongoClient.connect("mongodb://localhost:27017/maTwitter", (err, db) => {
  if (err) {
    console.error("fail to connect mongodb");
    throw err;
  }
  //Middleware Section:
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.set("trust proxy", 1);
  app.use(
    expressSession({
      secret: "Nurse save rare vases run",
      resave: false,
      saveUninitialized: true
    })
  );

  app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
  });

  //Router Setup Section:
  const dbHelper = require("./lib/db-functions.js")(db);
  app.use("/twits", require("./routes/twit")(dbHelper));
  app.use("/signup", require("./routes/signup")(dbHelper));
  app.use("/signin", require("./routes/signin")(dbHelper));
  app.use("/like", require("./routes/like")(dbHelper));

  app.get("/", (req, res) => {
    dbHelper.getAllTwits((err, allT) => {
      console.log("allT", allT);

      res.render("main", {
        allT: allT
      });
    });
  });
  app.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/");
  });

  app.get("/404", (req, res) => {
    console.log("hit 404");
    res.render("404");
  });

  app.get("*", (req, res) => {
    res.redirect("/404");
  });

  //Start Server:
  app.listen(PORT, () => {
    console.log("Twiiiter server listening on port " + PORT);
  });
});
