import {connect} from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()
const mongodb_url= process.env.MONGODB_URI || 'mongodb://localhost:27017/online-ticket';

export const connectDB = async () => {
  try {
    await connect(mongodb_url);
    console.log('MongoDB connected');
    
  } catch (error) {
    console.error(error);
  }
};