const express = require("express");

const { brokerController } = require("@controllers");

const router = express.Router();

router.get("/", brokerController.getAllBrokers); // Get all brokers
router.get("/:id", brokerController.getBrokerById); // Get a specific broker by its ID
router.post("/", brokerController.createBroker); // Create a new broker
router.delete("/:id", brokerController.deleteBroker); // Delete a broker by its ID
router.put("/:userId", brokerController.registerUserAsBroker); // register a user as a broker
router.post('/:id/add-property', brokerController.addPropertyToBroker); // add a property to a broker
router.post('/:id/remove-property', brokerController.removePropertyFromBroker); // remove a property from a broker

module.exports = router;
