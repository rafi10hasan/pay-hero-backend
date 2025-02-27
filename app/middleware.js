const express = require('express');
const cors = require('cors');
require('dotenv').config('./.env');

const middleware = [
    cors({
        origin: process.env.FRONTEND_HOST,  // Replace with the correct client URL
        credentials: true,
        optionsSuccessStatus: 200,  // Allow cookies
    }),
    express.json(),
]

module.exports = middleware