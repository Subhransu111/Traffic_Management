const {getuser} = require("../services/auth");

function authmiddleware(req, res, next) {
  try {
    const token = req.cookies?.uid;
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const user = getuser(token);
    if (!user) return res.status(401).json({ msg: "Invalid token" });

    req.user = user;  // so req.user.id and req.user.username are available
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = authmiddleware;