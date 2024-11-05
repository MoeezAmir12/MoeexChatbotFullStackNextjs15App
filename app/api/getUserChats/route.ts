import { ChatModelSchema } from "@/ChatModel/ChatModel";
import { connectDB } from "@/Utils/ConnectDB";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const checkDB = await connectDB();
    try
    {
        if(checkDB === true)
        {
            const data = await ChatModelSchema.find().then(response => {
                console.log("Response is",response);
                return response;
            })
           return NextResponse.json({
                data,
                status:200
            })
        }
    }
    catch(error)
    {
       return NextResponse.json({
            status: 500
        })
    }
}
