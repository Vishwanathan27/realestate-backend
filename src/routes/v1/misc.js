const express = require('express');

const { miscController } = require('@controllers');

const router = express.Router();

router.get('/health', miscController.health);

module.exports = router;
