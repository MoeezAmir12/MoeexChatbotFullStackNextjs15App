import { ChatModelSchema } from "@/ChatModel/ChatModel";
import { connectDB } from "@/Utils/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try{
const {chats} = await req.json();
const check = await connectDB()
if(check === true)
{
    const successData = "Chat Saved Success!"
return await ChatModelSchema.create(chats).then(() => {
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
