const { authService } = require("@services");

const { validateToken } = authService;

module.exports = { validateToken };
