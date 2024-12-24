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
