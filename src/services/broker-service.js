const { Broker, Property } = require("@models");
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
      await newBroker.save();

      return { message: "Broker successfully created" };
    } catch (error) {
      console.log(error);
      return { error };
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
      await newBroker.save();

      return { message: "User successfully registered as broker" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async deleteBroker(id) {
    try {
      await Broker.findByIdAndRemove(id);
      /*
      TODO: Remove the broker from a property using a background job
      */
      return { message: "Profile Successfully Deleted" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async getBrokerById(id) {
    try {
      const broker = await Broker.findById(id);
      return { broker };
    } catch (error) {
      console.log(error);
      return { error };
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
      const brokers = await Broker.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return { brokers };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async addPropertyToBroker(id, { property }) {
    try {
      const broker = await Broker.findById(id);
      if (!broker) {
        return { error: { message: "Broker not found" } };
      }
      broker.properties.push(property);

      const { _id } = await broker.save();

      await Property.findOneAndUpdate(
        { _id: property },
        { $addToSet: { brokers: _id } }
      );

      return { message: "Property successfully added to broker" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async removePropertyFromBroker(id, { property }) {
    try {
      const broker = await Broker.findById(id);
      if (!broker) {
        return { error: { message: "Broker not found" } };
      }
      broker.properties = broker.properties.filter(
        (brokerProperty) => brokerProperty._id !== property
      );
      const { _id } = await broker.save();

      await Property.findOneAndUpdate(
        { _id: property },
        { $pull: { brokers: _id } }
      );
      return { message: "Property successfully added to broker" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
