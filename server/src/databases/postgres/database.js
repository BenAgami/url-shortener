const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  }
);

const connectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const modelSync = async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log("Unable to synchronize all models:", error);
  }
};

const connection = async () => {
  await connectionTest();
  await modelSync();
};

module.exports = { sequelize, connection };
