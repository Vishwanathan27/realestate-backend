const mongoose = require("mongoose");
const moment = require("moment");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      default: () => moment().valueOf(),
    },
    updatedAt: {
      type: Number,
    },
    brokers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Broker",
      },
    ],
    landlords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord",
      },
    ],
  },
  { versionKey: false }
);

propertySchema.pre("save", function (next) {
  this.updatedAt = moment().valueOf();
  next();
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
