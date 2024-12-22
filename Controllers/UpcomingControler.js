const UpcomingEvents = require("../Model/UpcomingEvent");
exports.Upcoming = (req, res) => {
  try {
    const { company, eventName, location, eventDate, discription } = req.body;
    const NewEvents = new UpcomingEvents({
      company,
      eventName,
      location,
      eventDate,
      discription,
    });
    NewEvents.save();
    res.status(201).send({ message: "eventRegistration Done" });
  } catch (error) {
    res.status(400).send({ message: "NewEvents not Done" });
  }
};

exports.getUpcoming = async (req, res) => {
  try {
    const Events = await UpcomingEvents.find();
    res.status(200).send({ message: "data fech done", data: Events });
  } catch (error) {
    res.status(400).send({ message: "fech Data not found" });
  }
};
