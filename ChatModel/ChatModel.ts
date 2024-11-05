import mongoose from "mongoose";


const chatModel = new mongoose.Schema({
    userEmail: String,
    role: String,
    content: String
})

const ChatSchema = mongoose.model("ChatModel",chatModel);

export {ChatSchema};