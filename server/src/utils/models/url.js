const Sequelize = require("sequelize");
const { sequelizeUrlDB } = require("../../databases/postgres/database");

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
