const express = require("express");
const app = express();

// use takes one arg:
// 1. middleware you want to run

// static is a method on the express middleware module
app.use(express.static("public"));

app.listen(3000);
console.log("Server listening on port 3000...");
