const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DB_NAME = "urls_shortener";

const clientConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: "postgres",
};

const createPGDatabase = async () => {
  const client = new Client(clientConfig);

  try {
    await client.connect();

    const createDB = `CREATE DATABASE ${DB_NAME}`;
    await client.query(createDB);
    console.log(`Database "${DB_NAME}" created successfully`);
  } catch (error) {
    console.error("Error while creating database", error);
  } finally {
    await client.end();
    console.log(`Disconnected from database ${DB_NAME}`);
  }
};

module.exports = createPGDatabase;
