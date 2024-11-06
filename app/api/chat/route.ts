import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

export async function POST(req: Request) {
   
    const {messages} = await req.json();

    try
    {
    if(!messages)
    {
        NextResponse.json({
            status: 400,
            message: "Payload missing..."
        })
    }
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        stream: true,
      })
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    }
    catch(error: any)
    {
        NextResponse.json({
            status: 500,
            error: error.message
        }
        )
    }
      
    }