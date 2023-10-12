const { Broker } = require("@models");
const userService = require("./user-service");

module.exports = {
  async createBroker(broker) {
    try {
      const { password, ...otherUserData } = broker;
      const hashedPassword = await userService.hashPassword(password);
      // Registering the broker as user first
      const user = await userService.register({
        password: hashedPassword,
        roles: ["user", "broker"],
        ...otherUserData,
      });

      // Creating the broker profile
      const brokerData = {
        user: user._id,
        properties: broker.properties,
      };
      const newBroker = new Broker(brokerData);
      return await newBroker.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async registerUserAsBroker(userId) {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return { error: { message: "User not found" } };
      }
      // Creating the broker profile
      const brokerData = {
        user: userId,
        properties: [],
      };
      const newBroker = new Broker(brokerData);
      return await newBroker.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async deleteBroker(id) {
    try {
      await Broker.findByIdAndRemove(id);
      /*
      TODO: Remove the broker from a property using a background job
      */
      return "Profile Successfully Deleted";
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
  async addPropertyToBroker(id, property) {
    try {
      const broker = await Broker.findById(id);
      if (!broker) {
        return { error: { message: "Broker not found" } };
      }
      broker.properties.push(property);
      return await broker.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async removePropertyFromBroker(id, property) {
    try {
      const broker = await Broker.findById(id);
      if (!broker) {
        return { error: { message: "Broker not found" } };
      }
      broker.properties = broker.properties.filter(
        (brokerProperty) => brokerProperty._id !== property._id
      );
      return await broker.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
