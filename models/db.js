import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        mongoose.connect(
            "mongodb://127.0.0.1:27017/guru",
            {
                useNewUrlParser:true
            },
            err=> {
                if(!err) {
                    console.log("Connection Successful");
                } else {
                    console.log("Error connecting to the database: " + err);
                }
            }
        )
    } catch(err) {
        console.log("Error connecting to the database: " + err);
    }
};

export default connectDB;
