const { userService } = require("@services");
const { dataConfig } = require("@config");

const registerUser = async (req, res) => {
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
  const { query } = req;
  const page = parseInt(query.page) || dataConfig.page;
  const limit = parseInt(query.limit) || dataConfig.limit;
  const sort = query.sort || dataConfig.sort;
  const search = query.search || "";
  const { users, error } = await userService.getUsers(
    page,
    limit,
    search,
    sort
  );
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  res.status(200).send({ success: true, users });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { user, error } = await userService.getUserById(id);
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  delete user.password;
  res.status(200).send({ success: true, user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    const hashedPassword = await userService.hashPassword(req.body.password);
    req.body.password = hashedPassword;
  }
  const updatedData = req.body;
  const { message, error } = await userService.updateUser(id, updatedData);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  res.status(200).send({ success: true, message });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { message, error } = await userService.deleteUser(id);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  res.status(200).send({ success: true, message });
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
