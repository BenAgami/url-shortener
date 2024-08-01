const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../../databases/postgres/database");

const sequelizeUrlDB = sequelizeConnection();
const UrlModel = sequelizeUrlDB.define("url", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  originalUrl: Sequelize.STRING,
  shorterUrl: Sequelize.STRING,
});

module.exports = UrlModel;
