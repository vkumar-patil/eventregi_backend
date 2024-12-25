const mainusers = require("../Model/MainUserModel");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // const hashpassword = await bcrypt.hash(password, 10);
    const Newuser = new mainusers({ username, email, password });
    await Newuser.save();
    res.status(200).send("user created done");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     // Find user
//     const user = await users.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials: User not found" });
//     }

//     //  Checck
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials: Wrong password" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { username: user.username, email: user.email, Admin: user.Admin },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Respond with success
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { username: user.username, email: user.email, Admin: user.Admin },
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     return res.status(500).json({ message: "An error occurred during login" });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // Normalize email to lowercase to avoid case sensitivity issues
    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await mainusers.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Compare plain text passwords
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        Admin: user.Admin,
      },
      JWT_SECRET,
      { expiresIn: "1hr" }
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
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login failed" });
  }
};
