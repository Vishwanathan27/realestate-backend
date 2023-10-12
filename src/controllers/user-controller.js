const { userService } = require("@services");
const { dataConfig } = require("@config");

const register = async (req, res) => {
  try {
    const { password, ...otherUserData } = req.body;
    const hashedPassword = await userService.hashPassword(password);
    await userService.register({
      password: hashedPassword,
      ...otherUserData,
    });
    res
      .status(201)
      .send({ success: true, message: "User Successfully Registered" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;
    const search = query.search || "";
    const users = await userService.getUsers(page, limit, search, sort);
    res.status(200).send({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    console.log("user :", user);
    delete user.password;
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.password) {
      const hashedPassword = await userService.hashPassword(req.body.password);
      req.body.password = hashedPassword;
    }
    const updatedData = req.body;
    const user = await userService.updateUser(id, updatedData);
    delete user.password;
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
