"use server"

import Image from "next/image";
import Moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import ImageProfile from "@/components/ImageProfile";
import AppLoader from "@/components/AppLoader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/AuthOptions";
import EmptyComponent from "@/components/NoData";

const fetchMyChats = async() => {
    const session : null | {
        user?: {
            email: string;
        }
    }  = await getServerSession(authOptions);
    const myChatsURL = `${process.env.LOCALHOST_URL}/api/getUserChats`
    try
    {
const responseData = await fetch(`${myChatsURL}`,{
    cache: "no-store"
}).then(response => {
    return response?.json();
})
return responseData?.data?.filter((chats : {
    userEmail: string;
}) => chats.userEmail === session?.user?.email);
    }
    catch(error: any)
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
    if(chats?.length === 0)
    {
        return <EmptyComponent/>
    }
    return(
        <div className="flex flex-col w-full h-full p-6 justify-between items-center">
        <div className="flex flex-col gap-4 w-[90%] h-[80%] md:w-[60%] overflow-y-scroll scrollbar-none">
        {Array.isArray(chats) && chats?.length > 0 && chats?.map((chat) => {
          return(
            <div key={chat._id} className="w-full h-fit">
              {chat?.role === "assistant" && (
                <div className="flex flex-row gap-2 w-full h-full justify-start items-center">
                <Image alt="Loading..." src={Moeex} width={50} height={50} className="rounded-full shadow-md" />
                <p className="p-4 border-b-4 border-b-blue-500">{chat?.content}</p>
                </div>
                )}
            {chat?.role === "user" && (
                <div className="flex flex-row gap-2 w-full h-full justify-end items-center">
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