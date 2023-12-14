const PORT = process.env.PORT || 3000;
const secret = process.env.SECRET || "not-so-secret";
const APP_URL = process.env.APP_URL || "https://localhost:8080";
const MONGO_URL = "";
module.exports = {
  PORT,
  secret,
  APP_URL,
  MONGO_URL
};
