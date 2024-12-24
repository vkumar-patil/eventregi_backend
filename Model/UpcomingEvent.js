const mongoose = require("mongoose");
const UpcomingSchema = mongoose.Schema({
  company: { type: String, require: true },
  eventName: { type: String, require: true },
  location: { type: String, require: true },
  eventDate: { type: Date, require: true },
  discription: { type: String, require: true },
});
module.exports = mongoose.model("UpcomingEvents", UpcomingSchema);
