const { User } = require("@models");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (userData) => {
    const user = new User(userData);
    return user.save();
  },

  updateUser: async (userId, updatedData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      return { message: "User successfully updated" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  deleteUser: async (userId) => {
    try {
      await User.findByIdAndRemove(userId);
      return { message: "User successfully deleted" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  compareHashPassword: async (password, hash) => bcrypt.compare(password, hash),

  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return { user };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  async getUsers(
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
      const users = await User.find(query).skip(skip).limit(limit).sort(sort);
      return { users };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
