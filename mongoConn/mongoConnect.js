const express = require("express");
const app = express();

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

// where your db connection is running if there was one
const mongoUrl = `mongodb://localhost:27017`;

let db;
mongoClient.connect(mongoUrl, (error, databaseConn) => {
  db = databaseConn.db("electricOrNot"); // name of db
});

app.get("/", (req, res) => {
  db.collection("cars")
    .find({})
    .toArray((queryError, carsResults) => {
      console.log(carsResults);
      res.json(carsResults);
    }); // get the cars collection and get everything and turn to array
});

app.listen(3000);
