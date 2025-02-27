const express = require('express');
const verifyAgent = require('../services/transaction-agent-services/verify-agent');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router()

router.post('/agent',authMiddleware,verifyAgent);

module.exports = router