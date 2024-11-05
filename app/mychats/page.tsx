"use server"

import Image from "next/image";
import Moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import ImageProfile from "@/components/ImageProfile";
import AppLoader from "@/components/AppLoader";

const fetchMyChats = async() => {
    const myChatsURL = "/api/getUserChats"
    try
    {
const responseData = await fetch(`${myChatsURL}`,{
    cache: "no-store"
}).then(response => {
    return response;
})
return responseData;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
}

const MyChats = async() => {
    const chats = await fetchMyChats();
    if(!chats)
    {
        return <AppLoader/>
    }
    return(
        <div className="flex flex-col w-full h-full p-6 justify-between items-center">
        <div className="flex flex-col gap-4 w-[60%] h-[80%] overflow-y-scroll scrollbar-none">
        {Array.isArray(chats) && chats?.length > 0 && chats?.map((chat,indx) => {
          return(
            <div key={chat._id} className="w-full h-fit">
              {chat?.role === "assistant" && (
                <div className="flex flex-row gap-2 w-full h-[5rem] max-h-fit justify-start">
                <Image alt="Loading..." src={Moeex} width={30} height={30} className="rounded-md shadow-md" />
                <p className="p-4 border-b-4 border-b-fuchsia-500">{chat?.content}</p>
                </div>
                )}
            {chat?.role === "user" && (
                <div className="flex flex-row gap-2 w-full h-[5rem] max-h-fit justify-end">
                <p className="p-4 border-b-4 border-b-fuchsia-500">{chat?.content}</p>
                <ImageProfile/>
                </div>
                )}
            </div>
          )
        })}
        </div>
        </div>
    )
}

export default MyChats;