const jwt = require("jsonwebtoken");
const form = require("../helpers/statusCode");

const verifyUser = (_, res, next) => {
  const user = res.locals.user;
  if (!user.isAdmin) {
    return res
      .status(form.code.unauthorized)
      .send(form.error("Unauthorized"));
  }
  next();
};

const generateToken = async (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(form.code.unauthorized)
      .send(form.error("Unauthorized"));
  }
  const bearerToken = token.split(" ")[1];
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(form.code.unauthorized)
        .send(form.error("Token is invalid"));
    }
    res.locals.user = decoded;
    next();
  });
};

const refreshToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return error(res, "You are not authorized to access this page", 401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return error(res, "You are not authorized to access this page", 401);
    }
    const newToken = generateToken(decoded);
    res.set("Authorization", newToken);
    next();
  });
};

module.exports = {
  verifyUser,
  generateToken,
  verifyToken,
  refreshToken,
};
