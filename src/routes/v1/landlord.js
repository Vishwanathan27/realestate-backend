const express = require("express");

const { landlordController } = require("@controllers");

const router = express.Router();

router.get("/", landlordController.getAllLandlords); // Get all landlords
router.get("/:id", landlordController.getLandlordById); // Get a specific landlord by its ID
router.post("/", landlordController.createLandlord); // Create a new landlord
router.put("/:id", landlordController.updateLandlord); // Update a landlord by its ID
router.delete("/:id", landlordController.deleteLandlord); // Delete a landlord by its ID

module.exports = router;
