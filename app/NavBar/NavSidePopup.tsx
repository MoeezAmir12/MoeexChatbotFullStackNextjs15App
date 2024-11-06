"use client"
import store from "@/Utils/ProviderStore";
import Image from "next/image";
import GoogleButton from "react-google-button";
import Link from "next/link";
import moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import { loggedIn, loggedOut } from "@/redux/UserSlice";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { usePathname } from "next/navigation";


const NavSidePopup = () => {
    const {data} = useSession();
    const pathName = usePathname();
    const dispach = useDispatch();
    const [openSidePopUp,setOpenSidePopUp] = useState(false);
    const [isAuthenticating,setIsAuthenticating] = useState(false);
    const userDetails = useSelector((state : any) => {
      return state?.userReducer?.userDetails
    })
    const handleGoogleSignIn = async() => {
    setIsAuthenticating(true);
    await signIn("google");
    setIsAuthenticating(false);
    }
    const handleGoogleSignOut = async() => {
    setIsAuthenticating(true);
    await signOut();
    dispach(loggedOut());
    setIsAuthenticating(false);
    }
    useEffect(()=>{
      const reduxPayload = {
        name: data?.user?.name,
        email: data?.user?.email,
        imgURL: data?.user?.image
      }
     data?.hasOwnProperty('user') && dispach(loggedIn(reduxPayload));
    },[data])
    return(
        <div className="flex w-full h-[5rem] p-2 flex-col gap-2">
        <div className="flex flex-row w-full justify-between p-2 border-b-2 border-b-blue-700">
        <div className="flex flex-row gap-4"> 
    <FaBars
    width={20}
    height={20}
    onClick={() => setOpenSidePopUp(!openSidePopUp)}
    />
    <div className="flex flex-row gap-4 h-fit items-center">
    <Image alt="Loading..." src={moeex} width={30} height={30} className="shadow-violet-400 rounded-full shadow-md"/>
    <label className="text-[1rem] text-blue-600 hover:text-blue-900">Talk to Moeex AI-Powered Assistant</label>
    </div>
    </div>
    {userDetails?.name?.length > 0 &&
    <div className="flex flex-row gap-2 h-fit items-center">
      <label className="text-[1rem] font-bold text-pretty text-teal-800">Welcome {userDetails?.name}</label>
      <Image alt="Loading..." width={30} height={30} src={userDetails?.imgURL} className="rounded-full shadow-md"/>
    </div>
}
    </div>
    {openSidePopUp === true && <Sidebar toggled={openSidePopUp} width="fit-content" className="bg-[#002244] backdrop-brightness-0">
      <Menu className="w-fit p-2 bg-[#002244]">
        <MenuItem className="p-1 text-blue-400" active={pathName === "/"}  onClick={() => setOpenSidePopUp(!openSidePopUp)} component={<Link href={{pathname:"/"}} />}>Home</MenuItem>
        <MenuItem className="p-1 text-blue-400" active={pathName === "/mychats"} onClick={() => setOpenSidePopUp(!openSidePopUp)} component={<Link href={{pathname:"/mychats"}} />} disabled={userDetails?.email?.length === 0}> My Chat History</MenuItem>
        {!data && <MenuItem className="p-1 text-blue-400"><GoogleButton
        onClick={async() => {
           await handleGoogleSignIn()
          setOpenSidePopUp(!openSidePopUp)
        }}
        /></MenuItem>} 
        {isAuthenticating && <MenuItem className="p-1"><ClipLoader
    color={"silver"}
    loading={isAuthenticating}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  /></MenuItem>}
        {data && <MenuItem className="p-1"><button onClick={async() => await handleGoogleSignOut()} className="flex flex-row items-center w-fit p-2 h-fit rounded-md bg-blue-700 text-slate-200 font-bold">Sign out</button></MenuItem>}
      </Menu>
      </Sidebar>}
      </div>
    )
}

export default NavSidePopup;