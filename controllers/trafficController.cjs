
const Traffic = require("../models/traffic_report");

// Create a new traffic report
export const Trafficreport = async(req,res)=>{
    try{
        const{lat,lng,address,congestionLevel} = req.body;
        if(!lat || !lng || !address || !congestionLevel){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }

        const Newreport = new Traffic({
            user: req.user.id,
            username: req.user.username,
            location: {lat, lng, address},
            congestionLevel
        });

        await Newreport.save();
        res.status(201).json({
            message: "Traffic reported successfully",
            Newreport
        })
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}