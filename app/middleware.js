const express = require('express');
const cors = require('cors');
require('dotenv').config('./.env');

const middleware = [
    cors({
        origin: process.env.FRONTEND_HOST,  
        credentials: true,
        optionsSuccessStatus: 200,  
    }),
    express.json(),
]

module.exports = middleware