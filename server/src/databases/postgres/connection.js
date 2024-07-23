const { pgClient } = require("./client");

const DB_NAME = "urls_shortener";

let client;

const createPGDatabase = async () => {
  if (!client) {
    client = pgClient;
    try {
      await client.connect();

      const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
      await client.query(createDB);
      console.log(`Database "${DB_NAME}" created successfully`);
    } catch (error) {
      console.error("Error while creating database", error);
    } finally {
      await client.end();
      console.log(`Disconnected from database ${DB_NAME}`);
    }
  }
};

module.exports = { createPGDatabase };
