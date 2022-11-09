const path = require("path");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.send("Sanity Check");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

// since we are doing everything from the server, the form in the login.ejs file has action and method attributes
// the action will redirect user to that path when the form is submitted, and the method is a post request
// so we must add that route below
app.post("/process_login", (req, res, next) => {
  // req.body is made by the urlencoded middleware, which parses the http message for sent data, in this case the username and password from the form in login.ejs file
  const password = req.body.password;
  const username = req.body.username;
  // check the DB to see if user credentials are valid (not doing that here)
  // if they are valid send them to welcome page
  // save username in cookie
  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the variable
    // 2. value to set it to
    res.cookie("username", username);
    // res.redirect takes 1 arg:
    // 1. where to send the browser
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail");
  }
  //   res.json(req.body);
});

app.get("/welcome", (req, res, next) => {
  // req.cookies object will have a property for every named cookie that has been set
  res.render("Welcome", {
    username: req.cookies.username,
  });
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie takes 1 arg:
  // 1. cookie to clear, by name
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000);
console.log("Server listening loginSite");
