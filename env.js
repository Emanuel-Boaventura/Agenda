require("dotenv").config();

const CONNECTIONSTRING = process.env.CONNECTIONSTRING;

const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
  CONNECTIONSTRING,
  SESSION_SECRET,
};
