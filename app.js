const express = require("express");
const routes = require("./src/routes");
const cors = require("cors");

const app = express();

app.use(routes);
app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(cors());

module.exports = app;
