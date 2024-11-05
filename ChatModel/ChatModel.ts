import mongoose from "mongoose";


const chatModel = new mongoose.Schema({
    userEmail: String,
    role: String,
    contentID:String,
    content: String,
    userID:String
})


const ChatModelSchema = mongoose.models.ChatModel || mongoose.model("ChatModel",chatModel)

export {ChatModelSchema};