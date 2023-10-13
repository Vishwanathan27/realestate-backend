const { Property } = require("@models");

module.exports = {
  async createProperty(property) {
    try {
      await Property.create(property);
      return { message: "Created Successfully" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async updateProperty(id, property) {
    try {
      await Property.findByIdAndUpdate(id, property, { new: true });
      return { message: "Updated Successfully" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async deleteProperty(id) {
    try {
      await Property.findByIdAndRemove(id);
      return { message: "Successfully Deleted" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async getPropertyById(id) {
    try {
      const property = await Property.findById(id);
      return { property };
    } catch (error) {
      console.log(error);
      return { error };
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
      const properties = await Property.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return { properties };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
