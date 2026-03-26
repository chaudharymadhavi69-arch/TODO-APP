require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const logger = require("./src/middleware/logger");
const todoRoutes = require("./src/routes/todo.route");
const userRoutes = require("./src/routes/user.route");

const app = express();

app.use(express.json());
app.use(logger);


connectDB();


app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
