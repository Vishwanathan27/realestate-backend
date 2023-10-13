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
    location: { type: "Object", default: {} },
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

// Apply population to 'landlords' and 'brokers' when querying
propertySchema.pre("find", function (next) {
  this.populate({
    path: "brokers",
    select: "firstName lastName profilePicture email username",
  });

  this.populate({
    path: "landlords",
    select: "name description location",
  });
  next();
});

propertySchema.pre("findOne", function (next) {
  this.populate({
    path: "user",
    select: "firstName lastName profilePicture email username",
  });

  this.populate({
    path: "properties",
    select: "name description location",
  });
  next();
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
