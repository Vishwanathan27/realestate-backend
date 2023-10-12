const { Property } = require("@models");

module.exports = {
  async createProperty(property) {
    try {
      return await Property.create(property);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async updateProperty(id, property) {
    try {
      return await Property.findByIdAndUpdate(id, property, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async deleteProperty(id) {
    try {
      await Property.findByIdAndRemove(id);
      return "Successfully Deleted";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getPropertyById(id) {
    try {
      return await Property.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getProperties(
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
      return await Property.find(query).skip(skip).limit(limit).sort(sort);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
