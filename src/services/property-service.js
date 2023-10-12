const { Property } = require("@models");

module.exports = {
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
