const User = require("../models/user.js");
const { hash, compare } = require ("bcryptjs");
const { setuser } = require ("../services/auth");

//register new user
const registeruser = async (req,res)=>{
    try{
        const {username, email, phone, password, vehicle} = req.body;
        if(!username || !email || !phone || !password || !vehicle){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        
        const hashpassword = await hash(password, 10);
        const newUser = new User({
            username, email, phone, password: hashpassword, vehicle
        });
        await newUser.save();
        res.status(201).json({msg: "User registered successfully"});
    }
    catch(error){
        res.status(500).json({msg: error.message});
    }
};

//Login user
const Loginuser = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        const user = await User.findOne({email});
        const isMatch = await compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = setuser(user);
        res.cookie("uid", token, { httpOnly: true, secure: false });
        return res.status(200).json({ msg: "User logged in successfully", token });

        
    }
    catch(error){
    res.status(500).json({msg: error.message});
}

}
module.exports = { registeruser, Loginuser };
