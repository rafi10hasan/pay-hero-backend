const jwt = require('jsonwebtoken');

function verifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ); // Use your JWT_SECRET to verify
}

module.exports = { verifyToken };
