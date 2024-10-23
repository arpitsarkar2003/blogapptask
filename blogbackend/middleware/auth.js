const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from Authorization header (Bearer token)
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token after 'Bearer'

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Add user info to req object
    next();  // Proceed to next middleware or route
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
