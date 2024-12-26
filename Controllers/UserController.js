//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //const hashpassword = await bcrypt.hash(password, 10);
    const Newuser = new User({ username, email, password });
    await Newuser.save();
    res.status(200).send("user created done");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials user" });
    }
    console.log("Input password:", password);
    console.log("Stored hashed password:", user.password);
    const isPasswordValid = (password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Invalid credentials password", user });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        Admin: user.Admin,
      },
      process.env.JWT_SECRET, // Ensure this is defined
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        userId: user.id,
        username: user.username,
        email: user.email,
        Admin: user.Admin,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send({ message: "Login failed" });
  }
};
