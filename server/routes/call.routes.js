// Routes for voice
const express = require("express");
const callController = require("../controllers/call.controllers");

const router = express.Router();

// POST /voice
router.post("/", callController.post);
// POST /voice/respond
router.post("/respond", callController.respond);

module.exports = router;
