module.exports = {
  health: async (_, res) => {
    res.status(201).send("OK");
  },
};
