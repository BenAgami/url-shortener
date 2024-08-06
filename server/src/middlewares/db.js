const { sequelizeConnection } = require("../databases/postgres/database");

const connectToDb = async (req, res, next) => {
  try {
    req.sequelizeUrlDB = await sequelizeConnection();
    await req.sequelizeUrlDB.authenticate();
    console.log("Connection has been established successfully.");
    next();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Unable to connect to the databaser");
    throw error;
  }
};

const disconnectFromDb = async (req, res, next) => {
  res.on("finish", async () => {
    if (req.sequelizeUrlDB) {
      await req.sequelizeUrlDB.close();
      console.log("Connection has been closed successfully.");
    }
  });
  next();
};

module.exports = { connectToDb, disconnectFromDb };
