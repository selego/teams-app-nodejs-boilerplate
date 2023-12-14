const express = require("express");
const router = express.Router();

const SERVER_ERROR = "SERVER_ERROR";

router.get("/", async (req, res) => {
  try {
    console.log("message");
    return res.status(200).send({ ok: true, message: "The simplest boilerplate for Node.js projects" });
  } catch (error) {
    capture(error);
    return res.status(500).send({ ok: false, error });
  }
});

module.exports = router;
