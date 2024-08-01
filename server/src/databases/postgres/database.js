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

module.exports = {
  sequelizeConnection,
};
