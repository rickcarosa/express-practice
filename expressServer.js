const path = require("path");
const express = require("express");
// express() is a function from the express module
const app = express();

// server up static files
app.use(express.static("public"));

// all is a method that takes 2 args:
// 1. route
// 2. callback to run
app.all("/", (req, res) => {
  // Express handles the basic headers (status code, mime-type)
  // read in Node.html
  console.log(path.join(__dirname + "/node.html"));
  res.sendFile(path.join(__dirname + "/node.html"));
  // res.send(`<h1>This is the home page</h1>`)
  // Express handles the end
});

// even though this path is *, it will not run since express runs top down. So app.all with path / will serve contents and then not continue to app.all * path. * only gets hit if none of that paths match
app.all("*", (req, res) => {
  res.send("<h1>Sorry this page does not exist</h1>");
});

app.listen(3000);
console.log("Server listening on port 3000...");
