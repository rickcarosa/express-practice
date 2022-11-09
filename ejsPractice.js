const path = require("path");

const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

// serve up static files
app.use(express.static("public"));
// parse json and url encoded data in req.body
app.use(express.json());
app.use(express.urlencoded());

// app.set(), takes 2 args:
// 1. key
// 2. value

app.set("view engine", "ejs"); // without this, you will get error in browser saying cannot find default engine, must npm install ejs. by default express will look in a /views directory, so must create the file
app.set("views", path.join(__dirname, "views"));

// to use res.render
// 1. express happens, this file
// 2. define a view engine.
// - EJS
// - Mustache
// - Handlebars
// - Jade/Pug
// 3. inside one of our routes, we have a res.render
// 4. We pass the res.render 2 things:
// - the file we want to use (the view engine file)
// - the data we want to send that file
// 5. express uses the node module for our specified view engine and parses that file
// - that means it takes the html/js/css and combines it with whatever data there is in the file. (takes place of an actual front end like React)
// 6. the final result of this process is a compiled product of the things the browser can read
// - HTML, JS, CSS

function validateUser(req, res, next) {
  // validated logic
  res.locals.validated = true;
  next();
}

// added on every path with app.use
app.use(validateUser);

app.get("/", (req, res, next) => {
  // the data in the 2nd arg is going to be appended to res.locals (view files have access to the res.locals so you can do locals.msg or locals.validated)
  res.render("index", {
    msg: "Success!",
    msg2: "Failure!",
    html: `<p>HI</p>`,
    //   html came from the db and we want to drop it in the template
  }); // render index file, inside views directory
});

app.listen(3000);
