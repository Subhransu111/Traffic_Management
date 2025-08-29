const mongoose = require('mongoose');

const trafficReportSchema = new mongoose.Schema({
  location: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], required: true } ,
  status: { type: String, enum: ["clear", "moderate", "congested"], required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  confidence: { type: Number, default: 1 } // based on multiple reports
});
trafficReportSchema.index({ location: "2dsphere" });

const TrafficReport = mongoose.model("TrafficReport", trafficReportSchema);
module.exports = TrafficReport;
