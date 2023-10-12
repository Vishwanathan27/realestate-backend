const { Broker } = require("@models");

module.exports = {
  async createBroker(broker) {
    try {
      return await Broker.create(broker);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async updateBroker(id, broker) {
    try {
      return await Broker.findByIdAndUpdate(id, broker, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async deleteBroker(id) {
    try {
      await Broker.findByIdAndRemove(id);
      return "Successfully Deleted";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getBrokerById(id) {
    try {
      return await Broker.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getBrokers(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 }
  ) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      let query = {};
      if (searchTerm) {
        query = {
          $text: {
            $search: searchTerm,
          },
        };
      }
      return await Broker.find(query).skip(skip).limit(limit).sort(sort);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
