import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

const connectDB = async() => {
    try {
        if (NODE_ENV === 'development') {
                await mongoose.connect(DEV_DB_URL)
        }else if(NODE_ENV === 'production') {
            await mongoose.connect(PROD_DB_URL)
        }
        console.log(
            '\x1b[42m\x1b[37m\x1b[1m%s\x1b[0m', 
            `Connected to MongoDB database from ${process.env.NODE_ENV} environment`
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