const mongoService = require("./mongo-service");
const authService = require("./auth-service");
const miscService = require("./misc-service");
const userService = require("./user-service");
const propertyService = require("./property-service");
const brokerService = require("./broker-service");

module.exports = {
  mongoService,
  authService,
  miscService,
  userService,
  propertyService,
  brokerService,
};
