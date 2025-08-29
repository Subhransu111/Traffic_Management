const express= require("express");
const app = express();
const mongoose = require("mongoose");
const trafficRoute = require("./routes/traffic");

//Schema
const userSchema = new mongoose.Schema({
    username:{type: String , required: true},
    phone: {type: String, required: true, unique: true},
    role: {type: String , required: true},
    createdAt: {type: Date, default: Date.now},
});

const trafficReportSchema = new mongoose.Schema({
  location: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], required: true } ,
  status: { type: String, enum: ["clear", "moderate", "congested"], required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  confidence: { type: Number, default: 1 } // based on multiple reports
});
trafficReportSchema.index({ location: "2dsphere" });

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  type: { type: String, enum: ["main", "gully"], default: "gully" },
  path: [
    {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true } // GeoJSON coordinates
    }
  ],
  currentStatus: { type: String, enum: ["clear", "congested", "blocked"], default: "clear" }, 
});

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  },
  to: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  },
  suggestedRoute: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
  message: { type: String }, // e.g., "Take Gully 3, Main Road congested"
  createdAt: { type: Date, default: Date.now }
});

// Exports
module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("TrafficReport", trafficReportSchema);
module.exports = mongoose.model("Route", routeSchema);
module.exports = mongoose.model("Recommendation", recommendationSchema);



//Middlewares
app.use(express.json());


//Routes
app.get("/home",(req,res)=>{
    res.send("Hello from home page");
});
app.use("/traffic", trafficRoute);

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})