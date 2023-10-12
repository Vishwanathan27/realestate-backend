const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Broker", brokerSchema);
