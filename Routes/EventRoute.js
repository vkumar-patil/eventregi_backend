const express = require("express");
const UpcomingControler = require("../Controllers/UpcomingControler");
const EventController = require("../Controllers/EventController");
const router = express.Router();
router.post("/EventRegister", EventController.RegisterEvent);
router.post("/upcomingEvent", UpcomingControler.Upcoming);
router.get("/getEvents", UpcomingControler.getUpcoming);
router.get("/getRegisterdUsers", EventController.getRegisterdUser);
module.exports = router;
