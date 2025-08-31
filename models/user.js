const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username:{type: String , required: true},
    email:{type: String, required: true, unique: false},
    phone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    vehicle: {type: String , required: true},
    createdAt: {type: Date, default: Date.now},
});

const User = mongoose.model("user", userSchema);
module.exports = User;
