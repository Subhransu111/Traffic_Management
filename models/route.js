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