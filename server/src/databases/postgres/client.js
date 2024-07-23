const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const clientConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: "postgres",
};

pgClient = new Client(clientConfig);

module.exports = { pgClient };
