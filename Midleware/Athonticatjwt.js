exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "yourSecretKey", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; // रिक्वेस्टमध्ये वापरकर्ता जोडा
      next();
    });
  } else {
    res.sendStatus(401); // टोकन नाही
  }
};
