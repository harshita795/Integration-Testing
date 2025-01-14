const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, process.env.DB_FILE),
  logging: process.env.NODE_ENV !== "test", // disable logging during test
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

module.exports = { sequelize, connectDB };
