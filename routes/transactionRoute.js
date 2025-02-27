const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const sendMoneyUserToUser = require('../services/transaction-user-services/send-money-user-to-user');

const cashOut = require('../services/transaction-user-services/cash-out');
const cashInRequest = require('../services/transaction-agent-services/cash-in-request');
const withdrawRequest = require('../services/transaction-agent-services/withdraw-request');
const getAllCashInRequest = require('../services/transaction-agent-services/get-all-cash-in-request');
const cashInRequestSuccess = require('../services/transaction-agent-services/cash-in-request-success');
const { sendMoneyAgentToUser } = require('../services/transaction-agent-services/send-money-agent-to-user');
const getAllWithdrawRequest = require('../services/transaction-agent-services/get-all-withdraw-request');
const withdrawRequestSuccess = require('../services/transaction-agent-services/withdraw-request-success');


const router = express.Router()

router.post('/send-money',authMiddleware,sendMoneyUserToUser);
router.post('/agent-to-user/send-money',authMiddleware,sendMoneyAgentToUser);
router.post('/user-cash-out',authMiddleware,cashOut);
router.post('/cash-in-request',authMiddleware,cashInRequest);
router.post('/withdraw-request',authMiddleware,withdrawRequest);
router.get('/cash-requests',authMiddleware,getAllCashInRequest)
router.get('/withdraw-requests',authMiddleware,getAllWithdrawRequest)
router.put('/cash-request-success/:id',authMiddleware,cashInRequestSuccess)
router.put('/withdraw-request-success/:id',authMiddleware,withdrawRequestSuccess)

module.exports = router