const userModel = require("../models/user");
const form = require("../helpers/statusCode");
const verify = require("../middlewares/verify");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const user = new userModel(req.body);

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

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (!user)
      return res
        .status(form.code.notFound)
        .send(form.error("User not found"));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(form.code.badRequest)
        .send(form.error("Username or password is incorrect"));

    const token = await verify.generateToken(user);

    res.status(form.code.success).send(form.success(token));
  } catch (error) {
    res.status(form.code.error).send(form.error("Something went wrong"));
  }
};

module.exports = { register, login };
