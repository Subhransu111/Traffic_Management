const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { setuser } = require("../services/auth")

//register new user
const registeruser = async (req,res)=>{
    try{
        const {username, email, phone, password, vehicle} = req.body;
        if(!username || !email || !phone || !password || !vehicle){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        
        const hashpassword = await bcrypt.hash(password, 10);
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
        if(!user){
            return res.status(400).json({msg: "No account with this email has been registered"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        res.status(200).json({msg: "User logged in successfully"});
    }
    catch(error){
    res.status(500).json({msg: error.message});
}



const token = setuser(User);
res.cookies("uid",token)
return res.redirect("/")
} ;

module.exports = {
  register: registeruser,
  login: Loginuser,
};