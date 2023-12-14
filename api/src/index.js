require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

require("./services/mongo");

const { PORT, APP_URL } = require("./config.js");
const app = express();
const origin = [APP_URL];

console.log("origin", origin);
app.use(cors({ credentials: true, origin }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + "/../public"));

app.use("/message", require("./controllers/message"));

const d = new Date();

app.get("/", async (req, res) => {
  res.status(200).send("COUCOU " + d.toLocaleString());
});

app.listen(PORT, () => console.log("Listening on port " + PORT));
