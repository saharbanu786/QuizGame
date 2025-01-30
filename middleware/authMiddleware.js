const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT and authorize user roles
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

// Middleware to authorize admin
const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  if (!req.user.role || req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Forbidden. Admin access required." });
  }

  next();
};

module.exports = { authenticateToken, authorizeAdmin };
