const bcrypt = require("bcrypt");
const db = require("../models/user");

const createTestUser = async () => {
  // create test user if the db is empty
  if ((await db.countDocuments({})) === 0) {
    const user = new db({
      username: "admin",
      password: bcrypt.hashSync("admin", 10),
      isAdmin: true,
    });
    await user.save();
  }
};

module.exports = createTestUser;
