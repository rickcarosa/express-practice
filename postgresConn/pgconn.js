const express = require("express");
const app = express();
const PoolClass = require("pg").Pool;
// const { Pool } = require('pg')
// const pg = require('pg');

// the database in this example is not created, this is just how you would connect to an existing db
const pool = new PoolClass({
  user: "postgres",
  host: "localhost",
  database: "weatherTiler_development",
  port: 5432,
  password: "",
});

app.get("/", (req, res) => {
  // this would pass all the db data and you would need the row data to get the table data
  pool.query("SELECT * FROM city_weathers", (error, dbResponse) => {
    console.log(dbResponse.rows);
    // if db was real, this response would show up at http://localhost:3000
    res.json(dbResponse.rows);
  });

  pool.end();
});

app.listen(3000);
