const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

module.exports = mongoose.model("Landlord", landlordSchema);
