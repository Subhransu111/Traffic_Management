const jwt = require("jsonwebtoken");
const secret = "map_secret";
function setuser(user){
    const payload = { id: user._id, email: user.email };
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

  

function getuser(token){
    if (!token) return null;
    return jwt.verify(token,secret)
}

module.exports={
    setuser,
    getuser
}