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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials: User does not exist.");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials: Wrong password.");
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment variables.");
    }

    const token = jwt.sign(
      { username: user.username, email: user.email, Admin: user.Admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Corrected "1hr" to "1h" as per JWT convention
    );

    // Send response
    return res.status(200).send({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        Admin: user.Admin,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).send("Server error: Login failed.");
  }
};
