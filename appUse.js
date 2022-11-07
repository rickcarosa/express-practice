const express = require("express");
const app = express();

// middleware function is any function that has access to the req, res, and next object

// 1. req comes in
// 2. we need to validate th user, sometimes
// 3. we need to store some things in the DB
// 4. if there is data from the user we need to parse it and store it
// 5. res goes out

// 2-4 handled in middleware

// middleware function
function validateUser(req, res, next) {
  // get info out of the req object
  // do some stuff with the db
  res.locals.validated = true;
  console.log("Validated Ran!");
  next();
}

// this will run validateUser on all paths, all methods (use and get are the same thing, there is just no distinction when using app.use)
app.use(validateUser);

// this will run validateUser on /admin, all methods
app.use("/admin", validateUser);

// this will run validateUser on /, only on get methods
app.get("/", validateUser);
// same as this
// app.get("/", (req, res, next) => {
//   res.locals.validated = true;
//   console.log("Validated Ran!");
//   next();
// });

// whatever the path is in the url, it will show the appropriate message if the path matches the app.use or app.get path
app.get("/", (req, res, next) => {
  res.send(`<h1>Main Page</h1>`);
  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send(`<h1>Admin Page</h1>`);
  console.log(res.locals.validated);
});

app.listen(3000);
