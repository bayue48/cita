const userRouter = require("express").Router();

const userController = require("../controllers/user");
const verify = require("../middlewares/verify");

userRouter.post(
  "/",
  verify.verifyToken,
  verify.verifyUser,
  userController.addUser
);
userRouter.get(
  "/all",
  verify.verifyToken,
  verify.verifyUser,
  userController.getAllUser
);
userRouter.get(
  "/:id",
  verify.verifyToken,
  verify.verifyUser,
  userController.getUserById
);
userRouter.patch(
  "/:id",
  verify.verifyToken,
  verify.verifyUser,
  userController.updateUserById
);
userRouter.delete(
  "/:id",
  verify.verifyToken,
  verify.verifyUser,
  userController.deleteUserById
);
userRouter.get("/", verify.verifyToken, userController.getCurrentUser);
userRouter.patch("/", verify.verifyToken, userController.updateCurrentUser);
userRouter.delete("/", verify.verifyToken, userController.deleteCurrentUser);

module.exports = userRouter;
