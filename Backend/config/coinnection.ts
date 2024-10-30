import mongoose from "mongoose";
import envConfig from './env';

export default async function connectDb() {
  try {
    await mongoose.connect(envConfig.MONGO_URL as string);
    console.error("Database connected succesfully 🚀");
  } catch (error) {
    console.error("Mongo connection error ❌", error);
  }
}
