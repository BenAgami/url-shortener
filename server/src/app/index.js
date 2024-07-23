const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
// const swaggerDocument = require("../../swagger.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/books", (req, res) => {
  console.log("kakakakkakak");
  res.send([{ id: 1, name: "ben" }]);
});

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
