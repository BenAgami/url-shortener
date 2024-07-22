const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
