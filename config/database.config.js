const mongoose = require('mongoose');

const URL = process.env.DB_URL

async function connectDB(){
    try{
        const connection = mongoose.connect(URL.toString()).then(()=>{
            console.log('database connected successfully');
        })
        return connection;
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB