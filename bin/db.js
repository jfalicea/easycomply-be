require("dotenv").config();

const pgp = require("pg-promise")({
  query: (e) => console.log(e.query),
});

const db = pgp({
  database: "vendor",
  host: "localhost",
  port: 5433,
});

// console.log(`Database information: ${process.env.DB_Connection_String}`);

module.exports = db;
