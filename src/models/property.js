const mongoose = require("mongoose");
const moment = require("moment");

const propertySchema = new mongoose.Schema(
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

propertySchema.pre("save", function (next) {
  this.updatedAt = moment().valueOf();
  next();
});

// Apply population to 'userId' and 'properties' when querying
propertySchema.pre("find", function (next) {
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
