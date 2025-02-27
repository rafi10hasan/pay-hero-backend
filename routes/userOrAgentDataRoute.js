const express = require('express');
const getUserOrAgentDataController = require('../controller/userOrAgentController/getUserOrAgentDataController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

router.get('/user-agent/:id',authMiddleware,getUserOrAgentDataController);

module.exports = router