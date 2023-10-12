const { authService } = require("@services");
const { miscService } = require("@services");

const { health } = miscService;
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Authenticate the user
    const user = await authService.authenticate(username, password);

    if (!user) {
      return res.status(401).send({
        success: false,
        error: "Invalid username or password",
      });
    }

    // Generate JWT token for the authenticated user
    const token = await authService.generateToken(user);

    res.status(200).send({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  health,
};
