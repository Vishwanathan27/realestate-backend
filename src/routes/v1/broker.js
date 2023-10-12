const express = require("express");

const { brokerController } = require("@controllers");

const router = express.Router();

router.get("/", brokerController.getAllBrokers); // Get all brokers
router.get("/:id", brokerController.getBrokerById); // Get a specific broker by its ID
router.post("/", brokerController.createBroker); // Create a new broker
router.delete("/:id", brokerController.deleteBroker); // Delete a broker by its ID
router.put("/:userId", brokerController.registerUserAsBroker); // register a user as a broker

module.exports = router;
