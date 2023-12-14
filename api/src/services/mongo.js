const mongoose = require("mongoose");
const { MONGO_URL } = require("../config.js");

//Set up default mongoose connection

if (MONGO_URL) {
  console.log("load", MONGO_URL);
  mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
} else {
  console.log("ERROR CONNEXION. MONGO URL EMPTY");
}

mongoose.Promise = global.Promise; //Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("CONNECTED OK"));

module.exports = db;
