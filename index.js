const PORT = 8080;

//Define Section:
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const Mongolass = require("mongolass");
const mongolass = new Mongolass();
mongolass.connect("mongodb://localhost:27017/maTwitter");

//Initialization Section:
const app = express();

//Middleware Section:
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("trust proxy", 1);
app.use(expressSession({
  secret: 'Nurse save rare vases run',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

//Router Setup Section:
const dbHelper = require("./lib/db-functions.js")(mongolass);
app.use("/twits", require("./routes/twit")(dbHelper));
app.use("/signup", require("./routes/signup")(dbHelper));
app.use("/signin", require("./routes/signin")(dbHelper));
app.get("/", (req, res) => {
  dbHelper.getAllTwits().then(allT => {
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
