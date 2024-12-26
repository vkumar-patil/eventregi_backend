const Event = require("../Model/EventModel");
exports.RegisterEvent = async (req, res) => {
  try {
    const { username, email, Contact, eventName, eventDate, payment } =
      req.body;
    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate)) {
      return res.status(400).send({ message: "Invalid event date format." });
    }
    const newEvent = new Event({
      username,
      email,
      Contact,
      eventName,
      eventDate: parsedDate,
      payment,
    });
    await newEvent.save();
    res.status(201).send({ message: "Event Registration Done" });
  } catch (error) {
    console.error(error);
  }
};

exports.getRegisterdUser = async (req, res) => {
  try {
    const RegisterdUser = await Event.find();
    res
      .status(200)
      .send({ message: "Registered usrs get", data: RegisterdUser });
  } catch (error) {
    res.status(400).send({ message: "data not found registerd users" });
  }
};
// exports.deleteEvent = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const event = await Event.findByIdAndDelete(eventId);

//     if (!event) {
//       return res.status(404).send({ message: "Event not found" });
//     }

//     res.status(200).send({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting event:", error.message);
//     res.status(500).send({ message: "Failed to delete event" });
//   }
// };
