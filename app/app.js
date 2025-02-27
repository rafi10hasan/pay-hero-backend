require('dotenv').config('../.env');
const express = require('express');
const app = express();

const route  = require('./route');

const authRoute = require('../routes/authRoute');
const verifyAgentRoute = require('../routes/verifyAgentRoute')
const userOrAgentRouteData = require('../routes/userOrAgentDataRoute');
const transactionRoute = require('../routes/transactionRoute')
// all customize middleware
const middleware = require('./middleware');

//database connect
const connectDB = require('../config/database.config');
const { globalErrorHandler } = require('./error');

//middleware
app.use(middleware)
app.use(route)

connectDB()

// all api route middleware

app.use('/auth',authRoute);
app.use('/verify',verifyAgentRoute)
app.use('/data',userOrAgentRouteData);
app.use('/transaction',transactionRoute)

app.use(globalErrorHandler)

module.exports = app