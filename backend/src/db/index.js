import mongoose from "mongoose"

export const ConnectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected Successfully :: ",connectionInstance.connection.name);
    } catch (error) {
        console.log("MongoDB Connection Failed :: index.js ::", error)
    }
};
