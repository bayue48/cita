const express = require("express");
const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
