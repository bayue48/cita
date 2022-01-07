const express = require("express");

const welcomeRouter = express.Router();

welcomeRouter.get("/", (_, res) => {
  res.send("API HOMEPAGE");
});

module.exports = welcomeRouter;
