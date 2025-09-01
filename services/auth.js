const jwt = require("jsonwebtoken");
const secret = process.env.SECRET ||"map_secret";
const setuser = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        secret,
        { expiresIn: "1d" }
    );
};

// get user from token
const getuser = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};

module.exports = { setuser, getuser };