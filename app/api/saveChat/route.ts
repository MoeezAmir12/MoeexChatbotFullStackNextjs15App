import { ChatModelSchema } from "@/ChatModel/ChatModel";
import { connectDB } from "@/Utils/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try{
const {chats} = await req.json();
console.log(req);
const check = await connectDB()
console.log("here");
console.log(chats)
console.log(check);
if(check === true)
{
    console.log("entered");
    const successData = "Chat Saved Success!"
return await ChatModelSchema.create(chats).then(() => {
    console.log("Data inserted");
   return NextResponse.json(
    {
    data: successData,
    status: 200
    }
    )
 })
}
}
catch(error)
{
   return NextResponse.json({
        error: "Internal Server Error"
    },{
        status: 500
    })
}
} 
