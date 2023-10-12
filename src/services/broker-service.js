const { Broker, Property } = require("@models");
const userService = require("./user-service");

module.exports = {
  // Create a new broker
  async createBroker(broker) {
    try {
      const { password, ...otherUserData } = broker;
      const hashedPassword = await userService.hashPassword(password);
      const user = await userService.register({
        password: hashedPassword,
        roles: ["user", "broker"],
        ...otherUserData,
      });

      const brokerData = {
        user: user._id,
        properties: broker.properties,
      };
      const newBroker = new Broker(brokerData);
      await newBroker.save();

      return { message: "Broker successfully created" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Register a user as a broker
  async registerUserAsBroker(userId) {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return { error: { message: "User not found" } };
      }

      const brokerData = {
        user: userId,
        properties: [],
      };
      const newBroker = new Broker(brokerData);
      await newBroker.save();

      return { message: "User successfully registered as broker" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Delete a broker
  async deleteBroker(id) {
    try {
      await Broker.findByIdAndRemove(id);
      /*
      TODO: Remove the broker from a property using a background job
      */
      return { message: "Profile Successfully Deleted" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Get a broker by ID
  async getBrokerById(id) {
    try {
      const broker = await Broker.findById(id);
      return { broker };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Get a list of brokers
  async getBrokers(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 }
  ) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      const query = searchTerm ? { $text: { $search: searchTerm } } : {};
      const brokers = await Broker.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return { brokers };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Add a property to a broker
  async addPropertyToBroker(broker, { property }) {
    try {
      const update = {
        $push: { properties: property },
      };

      await Broker.findByIdAndUpdate(broker._id, update, {
        new: true,
      });

      await Property.findOneAndUpdate(
        { _id: property },
        { $addToSet: { brokers: broker._id } }
      );

      return { message: "Property successfully added to broker" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Remove a property from a broker
  async removePropertyFromBroker(broker, { property }) {
    try {
      const updatedProperties = broker.properties
        .filter((e) => e?._id?.toString() !== property)
        .map((e) => e._id.toString());

      const updatedBroker = { properties: updatedProperties };

      await Broker.findByIdAndUpdate(broker._id, updatedBroker, {
        new: true,
      });

      await Property.findOneAndUpdate(
        { _id: property },
        { $pull: { brokers: broker._id } }
      );

      return { message: "Property successfully removed from broker" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },
};
