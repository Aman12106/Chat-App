import mongoose from "mongoose";
import { ENV } from './env.js'

export const connectDB = async () => {
    try{
        await mongoose.connect(`${ENV.MONGODB_URL}/${ENV.DB_NAME}`);
        console.log("Connection successfull!");
        
    } catch(err) {
        console.log('Error connecting mongodb: ', err.message);
        process.exit(1);
    }
}