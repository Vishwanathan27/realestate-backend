const { Landlord } = require("@models");

module.exports = {
  async createLandlord(landlord) {
    try {
      return await Landlord.create(landlord);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async updateLandlord(id, landlord) {
    try {
      return await Landlord.findByIdAndUpdate(id, landlord, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async deleteLandlord(id) {
    try {
      await Landlord.findByIdAndRemove(id);
      return "Successfully Deleted";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getLandlordById(id) {
    try {
      return await Landlord.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getLandlords(
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
      return await Landlord.find(query).skip(skip).limit(limit).sort(sort);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
