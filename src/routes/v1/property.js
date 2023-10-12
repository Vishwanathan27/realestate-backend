const express = require("express");

const { propertyController } = require("@controllers");

const router = express.Router();

router.get("/", propertyController.getAllProperties); // Get all properties
router.get("/:id", propertyController.getPropertyById); // Get a specific property by its ID
router.post("/", propertyController.createProperty); // Create a new property
router.put("/:id", propertyController.updateProperty); // Update a property by its ID
router.delete("/:id", propertyController.deleteProperty); // Delete a property by its ID

module.exports = router;
