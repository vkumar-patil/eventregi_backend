const express = require("express");
const EventController = require("../Controllers/EventController");
const router = express.Router();
router.post("/EventRegister", EventController.RegisterEvent);

module.exports = router;
