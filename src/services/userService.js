const User = require("../models/userModel");

const createUser = async ({ email, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const user = new User({ email, password, role });
  await user.save();
  return user;
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};

module.exports = { createUser, authenticateUser };
