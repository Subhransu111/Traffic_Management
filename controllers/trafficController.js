
const Traffic = require ("../models/traffic_report");

// Create a new traffic report
 const Trafficreport = async(req,res)=>{
    try{
        const{lat,lng,address,congestionLevel} = req.body;
        if(!lat || !lng || !address || !congestionLevel){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        if (!req.user || !req.user.id || !req.user.username) {
            return res.status(401).json({ msg: "Invalid user data in token" });
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
    }catch (error) {
        console.error("Traffic report error:", error); 

        res.status(500).json({ message: error.message });
    }
};

module.exports = {Trafficreport};