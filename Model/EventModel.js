const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  Contact: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  ticketType: { type: String, required: true },
  payment: { type: String, required: true },
});
module.exports = mongoose.model("Event", eventSchema);
