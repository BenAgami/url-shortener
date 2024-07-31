const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelizeUrlDB = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  }
);

const testingConnection = async () => {
  try {
    await sequelizeUrlDB.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const modelSync = async () => {
  try {
    await sequelizeUrlDB.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log("Unable to synchronize all models:", error);
  }
};

const connection = async () => {
  await testingConnection();
  await modelSync();
};

module.exports = { sequelizeUrlDB, connection };
