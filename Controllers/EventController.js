const Event = require("../Model/EventModel");
exports.RegisterEvent = async (req, res) => {
  try {
    const {
      username,
      email,
      Contact,
      eventName,
      eventDate,
      ticketType,
      payment,
    } = req.body;
    const newEvent = new Event({
      username,
      email,
      Contact,
      eventName,
      eventDate,
      ticketType,
      payment,
    });
    await newEvent.save();
    res.status(201).send({ message: "Event Registration Done" });
  } catch (error) {
    console.error(error);
  }
};
