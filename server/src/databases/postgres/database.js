const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelizeConnection = () => {
  const sequelizeUrlDB = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: process.env.POSTGRES_DIALECT,
    }
  );
  return sequelizeUrlDB;
};

const initialConnectionToDb = async () => {
  const sequelizeUrlDB = await sequelizeConnection();

  try {
    await sequelizeUrlDB.authenticate();
    console.log("Initial connection has been established successfully.");
    await sequelizeUrlDB.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to initial connect to the database:", error);
    throw error;
  }

  await sequelizeUrlDB.close();
  console.log("Initial connection closed.");
};

module.exports = { sequelizeConnection, initialConnectionToDb };
