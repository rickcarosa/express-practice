const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

const router = require("./theRouter"); // bring in router file
const userRouter = require("./userRouter"); // bring in router file
app.use("/", router);
app.use("/user", userRouter);

app.listen(3000);
console.log("Router listening");
