const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["student", "instructor", "admin"])
      .withMessage("Invalid role"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser
);

router.get("/profile", protect, getUserProfile);

module.exports = router;
