const mongoose = require("mongoose");
const moment = require("moment");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String, // This could be a URL if you're storing images on AWS S3 or another service
      default: null,
    },
    createdAt: {
      type: Number, // Using Number type for Unix timestamp
      default: () => moment().valueOf(), // Returns current time as Unix timestamp
    },
    updatedAt: {
      type: Number,
    },
  },
  { versionKey: false }
);

// Pre-save hook to set updatedAt before saving the document
UserSchema.pre("save", function (next) {
  this.updatedAt = moment().valueOf();
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
