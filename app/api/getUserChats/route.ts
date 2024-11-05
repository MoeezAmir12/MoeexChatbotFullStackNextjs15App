import { ChatSchema } from "@/ChatModel/ChatModel";
import { connectDB } from "@/Utils/ConnectDB";
import { NextResponse } from "next/server";


async function GET(req: Request) {
    const checkDB = await connectDB();
    try
    {
        if(checkDB === true)
        {
            const data = await ChatSchema.find().then(response => {
                return response;
            })
            NextResponse.json({
                data
            },
                {
                status: 200
            })
        }
    }
    catch(error)
    {
        NextResponse.json({
            status: 500
        })
    }
}

export default GET;