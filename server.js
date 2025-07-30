require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protectedRoutes");

// Load env variables

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes); // Register auth routes
app.use("/api/protected", protectedRoutes); // Protected routes


app.listen(5000, () => console.log("Server started on port 5000"));