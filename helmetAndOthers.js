const express = require("express");
const app = express();
const helmet = require("helmet");

// helmet is an express security package
app.use(helmet());
app.use(express.static("public"));
// next 2 middleware lines create the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/ajax", (req, res) => {
  console.log(req.body);
  res.send("Test");
});

app.listen(3000);
console.log("PORT 3000");
