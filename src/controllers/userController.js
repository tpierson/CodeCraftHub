const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const { generateToken } = require("../utils/jwtHelper");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    const user = await userService.createUser({ email, password, role });
    const token = generateToken(user);
    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userService.authenticateUser(email, password);
    const token = generateToken(user);
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    // req.user is set in authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json({
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
