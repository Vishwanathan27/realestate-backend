module.exports = {
  url: process.env.MONGO_URL || "changeme",
  options: {
    useNewUrlParser: true,
    bufferCommands: false,
    useUnifiedTopology: true,
  },
};
