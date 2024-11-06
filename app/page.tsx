"use client"

import { IoCopy, IoEnterSharp, IoRefreshCircle } from "react-icons/io5";
import {useChat} from "ai/react" 
import Moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import DefaultUser from "@/images/defaultuser.png"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircleLoader} from "react-spinners";
import { CiSaveUp1 } from "react-icons/ci";
import { Toaster, toast } from 'sonner'
import { IUserInterface } from "@/interfaces/Interface";

export default function Home() {
  
  const [savedUserChats,setSavedUserChats] = useState([])
  const [saved,setSaved] = useState(false);
  const [copiedText,setCopiedText] = useState<{copiedIdx: number}>({
    copiedIdx: -1
  });
const {messages,input,handleInputChange,handleSubmit,isLoading,setInput} = useChat({
  api: '/api/chat',
  initialMessages: [{
    id: Date.now().toString(),
    role: "assistant",
    content: "Hi, Welcome I am Moeez, Introducing you to my Chatbot: Moeex AI-powered assistant, here to make your ideas come to life and answer your toughest questions—fast, friendly, and right at your fingertips. What can I help you with today?"
  },
]
})

const chatContainer = useRef<HTMLDivElement>(null);
const scrollContainer = () => {
  const {offsetHeight,scrollHeight,scrollTop} = chatContainer.current as HTMLDivElement
  if(scrollHeight >= scrollTop + offsetHeight) {
    chatContainer.current?.scrollTo(0,scrollHeight+200);
  }
}

const userDetails = useSelector((state: {
  userReducer: IUserInterface
}) => {
  return state?.userReducer?.userDetails;
})
const handleSaveChat = async(arrayIdx: number) => {
  const apiURL = `/api/saveChat`;
  const deepCloneChats = structuredClone(messages)
  const chatsArr = [deepCloneChats[arrayIdx],deepCloneChats[arrayIdx-1]]
  const Arr =  arrayIdx > 0 ? chatsArr : [deepCloneChats[arrayIdx]];
  const mappedChats = Arr.map(data => {
    return {
    userEmail: userDetails?.email,
    contentID: data.id,
    role: data.role,
    content: data.content
    }
  })
  const payload = {
    chats: mappedChats
  }
  try{
  const response = await fetch(apiURL,{
    method: "POST",
    body: JSON.stringify(payload)
  }).then(response => {
    return response.json();
  })
  setSaved(!saved);
  toast.success(response?.data)
  }
  catch(error)
  {
   
  }
  
  }
const handleCopiedText = () => {
    return (
      <span className="text-white">Copied !</span>
    )
}
useEffect(()=>{
scrollContainer();
},[messages])
useEffect(()=>{
  const handleMyChats = async() => {
    const resp = await fetch("api/getUserChats",{
       method: "GET"
     }).then(response => {
       return response.json();
     })
     setSavedUserChats(resp?.data);
     }
     userDetails?.email?.length > 0 && handleMyChats();
},[userDetails?.email,saved])
useEffect(() => {
setTimeout(() => {
 copiedText?.copiedIdx >= 0 && setCopiedText({
    copiedIdx: -1
  });
}, 5000);
},[copiedText])
  return (
    <div className="flex flex-col w-full h-[90vh] p-6 justify-between items-center">
    <div ref={chatContainer} className="flex flex-col gap-1 w-[90%] h-[80%] overflow-y-scroll scrollbar-none rounded-lg bg-violet-950 bg-opacity-45 md:w-[60%]">
    {messages?.map((msg,indx) => {
      return(
        <div key={msg?.id} className="w-full h-fit">
          {msg?.role === "assistant" && (
            <div className="flex flex-row gap-2 w-full h-full p-2 items-center">
            <Image alt="Loading..." src={Moeex} width={50} height={50} className="rounded-full shadow-md" />
            <div className="flex flex-col w-full h-full gap-1 p-4 border-b-4 border-b-blue-500">
            <p>{msg?.content}</p>
            <div className="flex flex-row w-full gap-1 justify-end">
              {copiedText?.copiedIdx === indx && handleCopiedText()}
              <button onClick={() => navigator.clipboard.writeText(msg?.content)
            .then(() => {
                setCopiedText({
                  copiedIdx: indx
                })
            })}><IoCopy width={30} height={30} color="light blue" className="group-hover:text-blue-600"/></button>
            {userDetails?.email?.length > 0 && indx !== 0 && (savedUserChats?.some((chat : {contentID: string;}) => chat?.contentID === msg.id) === false || savedUserChats?.length === 0) &&
            <button onClick={async() => await handleSaveChat(indx)}><CiSaveUp1 size={20} color="light blue"/></button>
            }
            {savedUserChats?.some((chat : {contentID: string}) => chat.contentID === msg.id) && <span className="text-white">Saved !</span> }
            </div>
            </div>
            </div>
            )}
        {msg?.role === "user" && (
            <div className="flex flex-row gap-2 w-full h-full p-2 items-center">
            <Image alt="Loading..." src={userDetails?.imgURL?.length > 0 ? userDetails?.imgURL : DefaultUser} width={50} height={50} className="rounded-full shadow-sm" />
            <div className="flex flex-col w-full h-full max-h-fit gap-2 border-b-4 p-4 border-b-fuchsia-500">
            <p>{msg?.content}</p>
            </div>
            </div>
            )}
        </div>
      )
    })}
    </div>
    <form onSubmit={handleSubmit} className="flex flex-row p-2 w-fit gap-2 h-[5rem] justify-between rounded-md border-4 border-opacity-80 border-l-blue-900 items-center">
     <textarea required className="w-[15rem] md:w-[40rem] rounded-md focus:outline-blue-500 h-[60%] max-h-fit p-1 bg-transparent"placeholder="Ask Moeex Chatbot anything..." value={input} onChange={handleInputChange}/>
     {isLoading === false && <button type="submit" className="flex items-center justify-center text-[1.2rem] rounded-full w-[2rem] h-[2rem] bg-yellow-400 font-extrabold !glow-yellow disabled:bg-yellow-50 glow-yellow" disabled={input?.length === 0}><IoEnterSharp width={20} height={20} color="white"/></button>}
     {isLoading && <span className="rounded-full min-w-[2rem] h-[2rem] bg-transparent text-center max-w-fit"><CircleLoader
        color={"purple"}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></span>  }
     <button type="submit" className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] bg-transparent border-2 border-blue-700 hover:border-blue-500" onClick={() => setInput("")}><IoRefreshCircle
     color="purple"
     size={40}
     /></button>
    </form>
    <Toaster richColors position="bottom-right" />
    </div>
  );
}
