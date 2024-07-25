const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const clientConfig = {
  host: process.env.PGHOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: "postgres",
};

pgClient = new Client(clientConfig);

module.exports = { pgClient };
