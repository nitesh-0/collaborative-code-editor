import mongoose from "mongoose"
import "dotenv/config"

const dbString:string = process.env.DB_STRING || ""

const dbConnection = async ()=> {
    try {
        
       await mongoose.connect(dbString);
        
       console.log(`Successfully connected to database.`);

    } catch (error) {
        console.log(error);
    }
}

export default dbConnection; 