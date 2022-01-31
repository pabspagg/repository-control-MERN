// Cliente <---> Node.js -> Express -> Middleware -> Controller
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { promisify } = require("util");

console.log(authConfig);

// HTTP -
//Headers
//body
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "token was not provided" });
  }
  // formato header
  // Bearer _Token

  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = auth;
