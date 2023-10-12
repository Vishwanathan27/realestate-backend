const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
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
});

// Apply population to 'userId' and 'properties' when querying
landlordSchema.pre("find", function (next) {
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

landlordSchema.pre("findOne", function (next) {
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

module.exports = mongoose.model("Landlord", landlordSchema);
