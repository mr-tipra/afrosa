const mongoose = require("mongoose");

const connectDB = async ()=>{

    
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

};

module.exports = connectDB;
