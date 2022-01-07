const express = require("express");
const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const userRouter = require("./user");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter;
