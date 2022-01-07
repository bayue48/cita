const model = require("../models/user");
const form = require("../helpers/statusCode");

const addUser = async (req, res) => {
  const user = new model(req.body);

  try {
    if (user.password && !user.password.startsWith("$2b"))
      user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(form.code.created).send(form.success(user));
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(form.code.conflict)
        .send(form.error("User already exists"));
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(form.code.badRequest).send(form.error(errors));
    }
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const getAllUser = async (_, res) => {
  const users = await model.find();

  try {
    res.status(form.code.success).send(form.success(users));
  } catch (error) {
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const getUserById = async (req, res) => {
  const user = await model.findById(req.params.id);

  try {
    if (!user)
      return res.status(form.code.notFound).send(form.error("User not found"));
    res.status(form.code.success).send(form.success(user));
  } catch (error) {
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const updateUserById = async (req, res) => {
  const body = Object.keys(model.schema.obj);
  const newBody = Object.keys(req.body);
  if (!newBody.some((key) => body.indexOf(key) >= 0))
    return res.status(form.code.badRequest).send(form.error("Invalid body"));
  try {
    const user = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user)
      return res.status(form.code.notFound).send(form.error("User not found"));
    if (user.password && !user.password.startsWith("$2b"))
      user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(form.code.success).send(form.success(user));
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(form.code.conflict)
        .send(form.error("User already exists"));
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(form.code.badRequest).send(form.error(errors));
    }
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const deleteUserById = async (req, res) => {
  const user = await model.findByIdAndDelete(req.params.id);

  try {
    if (!user)
      return res.status(form.code.notFound).send(form.error("User not found"));
    res.status(form.code.success).send(form.success(user));
  } catch (error) {
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const getCurrentUser = async (_, res) => {
  const user = res.locals.user;

  if (user.isAdmin) {
    res.status(form.code.success).send(form.success(user));
  } else {
    res
      .status(form.code.success)
      .send(form.success({ username: user.username }));
  }
};

const updateCurrentUser = async (req, res) => {
  const user = res.locals.user;
  const body = Object.keys(model.schema.obj);
  const newBody = Object.keys(req.body);
  if (!newBody.some((key) => body.indexOf(key) >= 0))
    return res.status(form.code.badRequest).send(form.error("Invalid body"));
  try {
    const update = await model.findOneAndUpdate(
      { username: user.username },
      req.body,
      {
        new: true,
      }
    );
    if (!update)
      return res.status(form.code.notFound).send(form.error("Please relogin"));
    if (update.password && !update.password.startsWith("$2b"))
      update.password = await bcrypt.hash(update.password, 10);
    await update.save();
    res.status(form.code.success).send(form.success(update));
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(form.code.conflict)
        .send(form.error("User already exists"));
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(form.code.badRequest).send(form.error(errors));
    }
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

const deleteCurrentUser = async (_, res) => {
  const user = res.locals.user;
  try {
    if (!user)
      return res.status(form.code.notFound).send(form.error("User not found"));
    await model.findByIdAndDelete(user.id);
    res.status(form.code.success).send(form.success(user));
  } catch (error) {
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
