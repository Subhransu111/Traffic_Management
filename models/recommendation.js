const mongoose = require('mongoose');

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

const Recommendation = mongoose.model("Recommendation", recommendationSchema);
module.exports = Recommendation;