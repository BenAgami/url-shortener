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
  let sequelizeUrlDB;

  try {
    sequelizeUrlDB = await sequelizeConnection();
    await sequelizeUrlDB.authenticate();
    console.log("Initial connection has been established successfully.");
    await sequelizeUrlDB.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to initial connect to the database:", error);
    throw error;
  } finally {
    if (sequelizeUrlDB) {
      try {
        await sequelizeUrlDB.close();
        console.log("Initial connection closed.");
      } catch (error) {
        console.log("Unable to close the initial connection:", error);
      }
    }
  }
};

module.exports = { sequelizeConnection, initialConnectionToDb };
