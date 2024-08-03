const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDB Database connected");
    } catch (error) {
        console.log("MongoDB Database connection failed : ",error);
    }
};

module.exports = connectDb;