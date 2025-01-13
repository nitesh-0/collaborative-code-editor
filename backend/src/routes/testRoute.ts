// backend/routes/commandRoutes.js
const express = require('express');
const {runCommand} = require("../test")
const router = express.Router();

router.post('/test-command', runCommand);

export default router
