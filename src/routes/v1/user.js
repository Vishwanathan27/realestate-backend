const express = require("express");

const { userController } = require("@controllers");

const router = express.Router();

router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get a specific user by its ID
router.put("/:id", userController.updateUser); // Update a user by its ID
router.delete("/:id", userController.deleteUser); // Delete a user by its ID
router.post("/", userController.registerUser); // Create a new user

module.exports = router;
