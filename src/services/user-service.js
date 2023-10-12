const { User } = require("@models");
const bcrypt = require("bcryptjs");

module.exports = {
  health: async (_, res) => {
    res.status(201).send("OK");
  },

  register: async (userData) => {
    const user = new User(userData);
    return user.save();
  },

  updateUser: async (userId, updatedData) =>
    User.findByIdAndUpdate(userId, updatedData, { new: true }),

  deleteUser: async (userId) => User.findByIdAndRemove(userId),

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  compareHashPassword: async (password, hash) => bcrypt.compare(password, hash),

  getUserById: async (userId) => User.findById(userId),

  async getUsers(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 },
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
      return await User.find(query).skip(skip).limit(limit).sort(sort);
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
