var express = require("express");
var router = express.Router();
const db = require("../database/db");

router.get("/", function (req, res, next) {
  // this would pass all the db data and you would need the row data to get the table data
  db.query("SELECT * FROM city_weathers", (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);
  });
});

module.exports = router;
