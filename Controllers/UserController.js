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

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send("Invalid credentials"); // Return prevents further execution
//     }

//     // Compare the password
//     const hashpassword = user.password;
//     const isvalidpassword = await bcrypt.compare(password, hashpassword);
//     if (!isvalidpassword) {
//       return res.status(400).send("Invalid credentials: wrong password"); // Return prevents further execution
//     }

//     // Generate the JWT token
//     const token = jwt.sign(
//       { username: user.username, email: user.email, Admin: user.Admin },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Send the response
//     return res.status(200).send({
//       message: "Login successful",
//       token,
//       user: { username: user.username, email: user.email, Admin: user.Admin },
//     });
//   } catch (error) {
//     console.error("Login error:", error); // Log the error for debugging
//     return res.status(500).send("An error occurred during login");
//   }
// };

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
      { username: user.username, email: user.email, Admin: user.Admin },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).send({
      message: "login successful",
      token,
      user: { username: user.username, email: user.email, Admin: user.Admin },
    });
  } catch (error) {
    res.status(400).send("invalid credincial login fail");
  }
};
