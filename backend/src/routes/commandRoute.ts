// backend/routes/commandRoutes.js
const express = require('express');
const { executeCommand } = require('../controller/commandController');

const router = express.Router();

router.post('/run-command', executeCommand);

export default router
