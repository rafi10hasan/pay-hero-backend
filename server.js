const http = require('http');
require('dotenv').config('./.env');

const app = require('./app/app.js');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000

server.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})
