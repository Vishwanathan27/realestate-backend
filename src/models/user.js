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
    roles: {
      type: Array,
      default: ["user"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Number,
      default: () => moment().valueOf(),
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
