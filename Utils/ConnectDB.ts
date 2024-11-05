import mongoose from "mongoose";


export const connectDB = async() => {
    const mongoURL = `mongodb+srv://moeex:${process.env.MongoDB_PASSWORD}@cluster0.nx9opu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 try{
    const checkConnection = await mongoose.connect(mongoURL).then(() => {
        return true
        })
        return checkConnection;
 }   
catch(error)
{
    return false;
}
}
