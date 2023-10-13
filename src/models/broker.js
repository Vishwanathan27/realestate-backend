const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { versionKey: false }
);

// Apply population to 'userId' and 'properties' when querying
brokerSchema.pre("find", function (next) {
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

brokerSchema.pre("findOne", function (next) {
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

module.exports = mongoose.model("Broker", brokerSchema);
