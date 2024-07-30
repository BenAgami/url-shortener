const Sequelize = require("sequelize");
const { sequelize } = require("../../databases/postgres/database");

const Url = sequelize.define("url", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  originalUrl: Sequelize.STRING,
  shortenerUrl: Sequelize.STRING,
});

module.exports = Url;
