const express = require("express");

const { propertyController } = require("@controllers");

const router = express.Router();

// router.get("/health", userController.health);
router.get("/", propertyController.getAllProperties); // Get all properties
// router.get("/:id", userController.getUserById); // Get a specific property by its ID
// router.put("/:id", userController.updateUser); // Update a property by its ID
// router.delete("/:id", userController.deleteUser); // Delete a property by its ID

module.exports = router;
