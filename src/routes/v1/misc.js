const express = require('express');

const { miscController } = require('@controllers');

const router = express.Router();

/**
 * @swagger
 * /public/misc/health:
 *   get:
 *     tags:
 *       - Misc
 *     summary: Health Check
 *     description: Checks health of server.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Server error
 */
router.get('/health', miscController.health);

module.exports = router;
