const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/utils/swagger/swagger.json");
const urlRouters = require("./src/routes/urls");
const {
  initialConnectionToDb,
  connectToDb,
  disconnectFromDb,
} = require("./src/middlewares/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
initialConnectionToDb().then();
app.use(connectToDb);
app.use(disconnectFromDb);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/url", urlRouters);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
