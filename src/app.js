const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
