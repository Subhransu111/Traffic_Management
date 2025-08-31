const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    username: {type:String},
    location:{
        lat: Number,
        lng: Number,
        address:String
    },
    congestionlevel:{
        type:String,
        enum:["low","medium","high"],
        required:true
    },


    reportTime: {type: Date, default: Date.now}
  
});


const TrafficReport = mongoose.model("TrafficReport", trafficSchema);
module.exports = TrafficReport;
