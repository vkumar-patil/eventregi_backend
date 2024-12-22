const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const Newuser = new User({ username, email, password: hashpassword });
    await Newuser.save();
    res.status(200).send("user created done");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("invalid credincial");
    }
    const hashpassword = user.password;
    const isvalidpassword = await bcrypt.compare(password, hashpassword);
    if (!isvalidpassword) {
      res.status(400).send("invalid credencial wrong password");
    }
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).send({
      message: "login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(400).send("invalid credincial login fail");
  }
};
