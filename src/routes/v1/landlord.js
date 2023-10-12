const express = require("express");

const { landlordController } = require("@controllers");

const router = express.Router();

router.get("/", landlordController.getAllLandlords); // Get all landlords
router.get("/:id", landlordController.getLandlordById); // Get a specific landlord by its ID
router.post("/", landlordController.createLandlord); // Create a new landlord
router.delete("/:id", landlordController.deleteLandlord); // Delete a landlord by its ID
router.put("/:userId", landlordController.registerUserAsLandlord); // register a user as a landlord
router.post("/:id/add-property", landlordController.addPropertyToLandlord); // add a property to a landlord
router.post(
  "/:id/remove-property",
  landlordController.removePropertyFromLandlord
); // remove a property from a landlord

module.exports = router;
