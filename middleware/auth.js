const {getuser} = require("../services/auth");


function authmiddleware(req,res,next) {
    const token = req.cookies?.uid || req.headers["authorization"]?.split(" ")[1];
    if(!token){
        return res.status(401).json({msg: "No authentication token, authorization denied"});
    }
    try{
        const user = getuser(token);
        req.user = user;
        next();

    }catch(error){
        res.status(401).json({msg: "Token verification failed, authorization denied"});
    }
}

module.exports = authmiddleware;