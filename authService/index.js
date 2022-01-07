require("dotenv").config();
require("./configs/db");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mainRouter = require("./routes/index");
const app = express();
const port = process.env.PORT || 3000;
const createTestUser = require("./helpers/createUser");
createTestUser();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(express.static("public"));
app.use(cors());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", mainRouter);
app.use("*", (_, res) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
