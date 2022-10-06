require("dotenv").config();

const MONGODB_CONNECT_URL = process.env.MONGODB_CONNECT_URL;

const SESSION_SECRET = process.env.SESSION_SECRET;

const PORT = Number(process.env.PORT) || 3000;

module.exports = {
  MONGODB_CONNECT_URL,
  SESSION_SECRET,
  PORT,
};
