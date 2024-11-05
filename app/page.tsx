"use client"

import { IoCopy, IoRefreshCircle } from "react-icons/io5";
import {useChat} from "ai/react" 
import Moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import DefaultUser from "@/images/defaultuser.png"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircleLoader, ClipLoader } from "react-spinners";
import { CiSaveUp1 } from "react-icons/ci";
import AppLoader from "@/components/AppLoader";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function Home() {
  const [isSaving,setIsSaving] = useState(false);
  const [isOpenToast,setIsOpenToast] = useState(false);
  const [copiedText,setCopiedText] = useState<{copiedIdx: number}>();
const {messages,input,handleInputChange,handleSubmit,isLoading,setInput} = useChat({
  api: '/api/chat',
  initialMessages: [{
    id: Date.now().toString(),
    role: "assistant",
    content: "Hi, Welcome to Moeex AI Chatbot, let's chat..."
  },
]
})

console.log("Messgaes",messages);
const chatContainer = useRef<HTMLDivElement>(null);
const scrollContainer = () => {
  const {offsetHeight,scrollHeight,scrollTop} = chatContainer.current as HTMLDivElement
  if(scrollHeight >= scrollTop + offsetHeight) {
    chatContainer.current?.scrollTo(0,scrollHeight+200);
  }
}
const handleSaveChat = async(arrayIdx: number) => {
  setIsSaving(false);
const apiURL = "/api/saveChat";
const deepCloneChats = structuredClone(messages)
const chatsArr = [deepCloneChats[arrayIdx-1],deepCloneChats[arrayIdx]]
const payload = {
  chats: chatsArr
}
try{
const response = await fetch(apiURL,{
  body: JSON.stringify(payload)
}).then(response => {
  return response.json();
})
setIsOpenToast(true);
toast.success(response);
}
catch(error)
{
  setIsOpenToast(true);
  toast.error(error.message);
}
setIsSaving(true);
}
const userDetails = useSelector(state => {
  return state?.userReducer?.userDetails;
})
const handleCopiedText = () => {
  setTimeout(() => {
    return (
      <span className="text-white">Copied !</span>
    )
  },2000)
}
useEffect(()=>{
scrollContainer();
},[messages])
console.log(messages);
  return (
    <div className="flex flex-col w-full h-[90vh] p-6 justify-between items-center">
      {isSaving && <AppLoader/>}
    <div ref={chatContainer} className="flex flex-col gap-1 w-[90%] h-[80%] overflow-y-scroll scrollbar-none rounded-lg bg-violet-950 bg-opacity-35 md:w-[60%]">
    {messages?.map((msg,indx) => {
      return(
        <div key={msg?.id} className="w-full h-fit">
          {msg?.role === "assistant" && (
            <div className="flex flex-row gap-2 w-full h-full p-2 items-center">
            <Image alt="Loading..." src={Moeex} width={50} height={50} className="rounded-full shadow-md" />
            <div className="flex flex-col w-full h-full gap-2 p-4 border-b-4 border-b-fuchsia-500">
            <p>{msg?.content}</p>
            <div className="flex flex-row w-full gap-1 justify-end">
              {copiedText?.copiedIdx === indx && handleCopiedText()}
              <button onClick={() => navigator.clipboard.writeText("Hello, world!")
            .then(() => {
                setCopiedText({
                  copiedIdx: indx
                })
            })}><IoCopy width={30} height={30} color="purple" className="hover:text-purple-600"/></button>
            {userDetails?.email?.length > 0 && <div className="flex flex-row w-full justify-end">
            <button onClick={async() => await handleSaveChat(indx)}><CiSaveUp1 size={30} color="purple"/></button>
            </div>
            }
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
    <form onSubmit={handleSubmit} className="flex flex-row p-2 w-fit gap-2 h-[5rem] justify-between rounded-md border-4 border-opacity-80 border-l-fuchsia-900 items-center">
     <textarea required className="w-[15rem] md:w-[40rem] rounded-md focus:outline-violet-500 h-[60%] max-h-fit p-1 bg-transparent"placeholder="Ask Moeex Chatbot anything..." value={input} onChange={handleInputChange}/>
     {isLoading === false && <button type="submit" className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] bg-yellow-400 font-extrabold !glow-yellow disabled:bg-yellow-50 glow-yellow" disabled={input?.length === 0}>{">"}</button>}
     {isLoading && <span className="rounded-full min-w-[2rem] h-[2rem] bg-transparent text-center max-w-fit"><CircleLoader
        color={"purple"}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></span>  }
     <button type="submit" className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] bg-transparent border-2 border-fuchsia-500 hover:border-fuchsia-300" onClick={() => setInput("")}><IoRefreshCircle
     color="purple"
     size={40}
     /></button>
    </form>
    {isOpenToast && <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar/>}
    </div>
  );
}
