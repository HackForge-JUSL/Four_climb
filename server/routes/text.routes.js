// Routes for sms
const express = require("express");
const textController = require("../controllers/text.controllers");

const router = express.Router();

// POST /sms
router.post("/", textController.post);

module.exports = router;
