const express = require('express');
const { registerController } = require('../controller/authController/registerController');
const signInController = require('../controller/authController/signInController');
const authMiddleware = require('../middleware/authMiddleware');
const getAllAccounts = require('../services/user-services/get-all-accounts');
const getAccountById = require('../services/user-services/get-account-by-id');
const updateStatus = require('../services/user-services/update-status');
const { getOverview } = require('../services/overview/overview');

const router = express.Router()

router.post('/signup',registerController);
router.post('/signin',signInController);
router.get('/accounts',authMiddleware,getAllAccounts)
router.get('/accounts/:id',authMiddleware,getAccountById)
router.put('/accounts/status/:id',authMiddleware,updateStatus)
router.get('/overview',authMiddleware,getOverview)
module.exports = router