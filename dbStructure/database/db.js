const PoolClass = require("pg").Pool;

// the database in this example is not created, this is just how you would connect to an existing db
const pool = new PoolClass({
  user: "postgres",
  host: "localhost",
  database: "weatherTiler_development",
  port: 5432,
  password: "",
});

module.exports = {
  query: (queryText, params, callback) => {
    return pool.query(queryText, params, callback);
  },
};
