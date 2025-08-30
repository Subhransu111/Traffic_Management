const jwt = require("jsonwebtoken");
const secret = "qw21@#%^()Aks//<>==+subh91221&"
function setuser(user){
    const payload ={
        ...user
    };

    return jwt.sign(payload,secret)

}

function getuser(token){
    if (!token) return null;
    return jwt.verify(token,secret)
}

module.exports={
    setuser,
    getuser
}