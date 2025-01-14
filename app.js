const express = require("express");
const bookmarkRoutes = require("./routes/bookmarks.js");
const { connectDB } = require("./db/init.js");

const app = express();
app.use(express.json());

// Connect to the Database
connectDB();

//  Routes
app.use("/bookmarks", bookmarkRoutes);

module.exports = app;
