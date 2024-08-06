const Sequelize = require("sequelize");

const { sequelizeConnection } = require("../../databases/postgres/database");

const sequelizeUrlDB = sequelizeConnection();

const getUrlModel = () => {
  const tableName =
    process.env.NODE_ENV === "test"
      ? process.env.TESTING_TABLE
      : process.env.DEV_TABLE;

  const UrlModel = sequelizeUrlDB.define(tableName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    originalUrl: Sequelize.STRING,
    shorterUrl: Sequelize.STRING,
  });

  return UrlModel;
};

module.exports = getUrlModel;
