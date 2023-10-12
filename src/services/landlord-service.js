const { Landlord, Property } = require("@models");
const userService = require("./user-service");

module.exports = {
  // Create a new landlord
  async createLandlord(landlord) {
    try {
      const { password, ...otherUserData } = landlord;
      const hashedPassword = await userService.hashPassword(password);
      const user = await userService.register({
        password: hashedPassword,
        roles: ["user", "landlord"],
        ...otherUserData,
      });

      const landlordData = {
        user: user._id,
        properties: landlord.properties,
      };
      const newLandlord = new Landlord(landlordData);
      await newLandlord.save();

      if (landlord.properties.length > 0) {
        const promises = landlord.properties.map(async (property) => {
          await Property.findOneAndUpdate(
            { _id: property },
            { $addToSet: { landlords: newLandlord._id } }
          );
        });
        await Promise.all(promises);
      }

      return { message: "Landlord successfully created" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Register a user as a landlord
  async registerUserAsLandlord(userId) {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return { error: { message: "User not found" } };
      }

      const landlordData = {
        user: userId,
        properties: [],
      };
      const newLandlord = new Landlord(landlordData);
      await newLandlord.save();

      return { message: "User successfully registered as landlord" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Delete a landlord
  async deleteLandlord(id) {
    try {
      await Landlord.findByIdAndRemove(id);
      /*
      TODO: Remove the landlord from a property using a background job
      */
      return { message: "Profile Successfully Deleted" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Get a landlord by ID
  async getLandlordById(id) {
    try {
      const landlord = await Landlord.findById(id);
      return { landlord };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Get a list of landlords
  async getLandlords(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 }
  ) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      const query = searchTerm ? { $text: { $search: searchTerm } } : {};
      const landlords = await Landlord.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return { landlords };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Add a property to a landlord
  async addPropertyToLandlord(landlord, { property }) {
    try {
      const update = {
        $push: { properties: property },
      };

      await Landlord.findByIdAndUpdate(landlord._id, update, {
        new: true,
      });

      await Property.findOneAndUpdate(
        { _id: property },
        { $addToSet: { landlords: landlord._id } }
      );

      return { message: "Property successfully added to landlord" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  // Remove a property from a landlord
  async removePropertyFromLandlord(landlord, { property }) {
    try {
      const updatedProperties = landlord.properties
        .filter((e) => e?._id?.toString() !== property)
        .map((e) => e._id.toString());

      const updatedLandlord = { properties: updatedProperties };

      await Landlord.findByIdAndUpdate(landlord._id, updatedLandlord, {
        new: true,
      });

      await Property.findOneAndUpdate(
        { _id: property },
        { $pull: { landlords: landlord._id } }
      );

      return { message: "Property successfully removed from landlord" };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },
};
