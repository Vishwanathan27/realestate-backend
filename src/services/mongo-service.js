const mongoose = require("mongoose");
const { mongoConfig } = require("@config");

module.exports = {
  async connect() {
    try {
      await mongoose.connect(mongoConfig.url, mongoConfig.options);
    } catch (err) {
      console.error("[MONGO] Error connecting to Database", err);
    }
  },
};
