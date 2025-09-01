const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    address: { type: String, required: true }
  },
  congestionLevel: { type: String, required: true } // ✅ fixed camelCase
});


const TrafficReport = mongoose.model("TrafficReport", trafficSchema);
module.exports = TrafficReport;
