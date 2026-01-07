const mongoose = require('mongoose');

module.exports.connect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB name:', mongoose.connection.name);

        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Failed to connect to MongoDB", error);
    }
}