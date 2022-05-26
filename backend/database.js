const mongoose = require('mongoose');
const mongouri = "mongodb://localhost:27017/testing";


const connectToMongo = ()=> {
    mongoose.connect(mongouri, ()=>{
        console.log("connected to database");
    })
}

module.exports = connectToMongo;