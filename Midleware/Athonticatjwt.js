const jwt = require('jsonwebtoken');

// Middleware to check if the token is valid
const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if the token is provided
  if (!token) {
    return res.status(403).json({ message: 'No token provided, authorization denied' });
  }

  // Remove the "Bearer" prefix if it exists
  const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  // Verify the token
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }

    // Save the decoded data (user info) into the request object for further use
    req.user = decoded;

    next(); // Call next() to pass control to the next middleware/route handler
  });
};

module.exports = verifyJWT;
