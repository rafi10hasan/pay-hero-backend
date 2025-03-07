const jwt = require('jsonwebtoken');

const generateAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET) 
}

module.exports = {generateAccessToken}