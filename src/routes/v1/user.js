const express = require("express");

const { userController } = require("@controllers");

const router = express.Router();

router.get("/", userController.getAllUsers); // Get all posts
router.get("/:id", userController.getUserById); // Get a specific post by its ID
router.put("/:id", userController.updateUser); // Update a post by its ID
router.delete("/:id", userController.deleteUser); // Delete a post by its ID

module.exports = router;
