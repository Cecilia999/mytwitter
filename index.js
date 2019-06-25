const PORT = 8080;

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("trust proxy", 1);

const Mongolass = require("mongolass");
const mongolass = new Mongolass();
mongolass.connect("mongodb://localhost:27017/maTwitter");

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

app.listen(PORT, () => {
  console.log("Tweeter server listening on port " + PORT);
});
