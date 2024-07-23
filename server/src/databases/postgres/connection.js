const { pgClient } = require("./client");
const { tableQuery } = require("./createTableQuery");

const DB_NAME = "urls_shortener";

let client;

const createPGDatabase = async () => {
  if (!client) {
    client = pgClient;

    try {
      await client.connect();

      await client.query(tableQuery);
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
