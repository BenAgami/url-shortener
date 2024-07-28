const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../utils/swagger/swagger.json");
const routers = require("../routes/urls");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/url", routers);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
