const Sequelize = require("sequelize");
const { sequelize } = require("../../databases/postgres/database");

const Url = sequelize.define("mockedUrl", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  originalUrl: Sequelize.STRING,
  shortenerUrl: Sequelize.STRING,
});

const addMockings = async () => {
  const mockedUrl = {
    originalUrl: "http://google.com/",
    shortenerUrl: "google",
  };

  await Url.create(mockedUrl);
};

module.exports = { Url, addMockings };
