const express = require("express");
const app = express();

// app object has a few methods:
// HTTP/REST verbs
// 1. get
// 2. post
// 3. put
// 4. delete

// Take 2 args:
// 1. path
// 2. callback to run if an HTTP request that matches THIS verb is made to the path in #1
app.get("/", (req, res) => {
  console.log(req);
  res.send(`<h1>Welcome to the home GET page</h1>`);
});
app.post("/", (req, res) => {
  res.send(`<h1>Welcome to the home POST page</h1>`);
});
app.put("/", (req, res) => {});
app.delete("/", (req, res) => {});

app.listen(3000);
console.log("Listening on port 3000...");
