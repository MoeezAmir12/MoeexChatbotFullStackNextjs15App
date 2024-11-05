import { ChatSchema } from "@/ChatModel/ChatModel";
import { connectDB } from "@/Utils/ConnectDB";
import { NextResponse } from "next/server";

async function POST(req: Request,res: Response) {
try{
const {body} = await req.json();
const check = await connectDB()
if(check === true)
{
    const successData = "Chat Saved Success!"
 await ChatSchema.create(body).then(() => {
   NextResponse.json(
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
    NextResponse.json({
        error: "Internal Server Error"
    },{
        status: 500
    })
}
} 

export default POST;