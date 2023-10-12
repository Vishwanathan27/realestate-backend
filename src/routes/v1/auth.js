const express = require("express");
const { authController } = require("@controllers");

const router = express.Router();

/**
 * @swagger
 * /public/auth/health:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Health check for authentication
 *     description: Check if the authentication service is running
 *     responses:
 *       '200':
 *         description: Authentication service is healthy
 */
router.get("/health", authController.health);

/**
 * @swagger
 * /public/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Login
 *     description: Logs the user in and provides token.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Server error
 */
router.post("/login", authController.login);

module.exports = router;
