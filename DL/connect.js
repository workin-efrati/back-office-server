import mongoose from "mongoose";

export const connect = async () => {
   try {
      if (mongoose.connection.readyState !== 1) {  
         await mongoose.connect(process.env.MONGO_URL);
         console.log('Connected to MongoDB');
      } else {
         console.log('Already connected to MongoDB');
      }
   } catch (error) {
      console.log(error);
   }
}
