const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // There is no standard for a lower or upper case A(a)uthorization
  // Best practice: check for both
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // is required: (!authHeader?.startsWith("Bearer "))
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // We don't want: ("Bearer ") --> just the token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    (req.user = decoded.UserInfo.username),
      (req.roles = decoded.UserInfo.roles);
    next();
  });
};

module.exports = verifyJWT;
