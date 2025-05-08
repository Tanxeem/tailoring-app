import mongoose from "mongoose";

import { DEV_DB_URL } from "./serverConfig.js";

const connectDB = async() => {
    try {
        await mongoose.connect(DEV_DB_URL)
        console.log(
            '\x1b[42m\x1b[37m\x1b[1m%s\x1b[0m', 
            'Connected to MongoDB database'
          );
    } catch (error) {
        console.log(
            '\x1b[41m\x1b[37m\x1b[1m%s\x1b[0m', 
            'Error connecting to database:', 
            error
          );
    }
}

export default connectDB;