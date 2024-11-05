"use client"
import store from "@/Utils/ProviderStore";
import Image from "next/image";
import GoogleButton from "react-google-button";
import Link from "next/link";
import moeex from "@/images/Blue Grey Minimalist Music YouTube Channel Logo (4).png";
import { loggedIn, loggedOut } from "@/redux/UserSlice";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
""

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
    const reduxPayload = {
      name: data?.user?.name,
      email: data?.user?.email,
      imgURL: data?.user?.image
    }
    dispach(loggedIn(reduxPayload));
    setIsAuthenticating(false);
    }
    const handleGoogleSignOut = async() => {
    setIsAuthenticating(true);
    await signOut();
    dispach(loggedOut());
    setIsAuthenticating(false);
    }
    return(
        <div className="flex w-full h-[5rem] p-2 flex-col gap-2">
        <div className="flex flex-row w-full justify-between p-2 border-b-2 border-b-violet-700">
        <div className="flex flex-row gap-4"> 
    <FaBars
    width={20}
    height={20}
    onClick={() => setOpenSidePopUp(!openSidePopUp)}
    />
    <div className="flex flex-row gap-4 h-fit items-center">
    <Image alt="Loading..." src={moeex} width={30} height={30} className="shadow-violet-400"/>
    <label className="text-[1rem] text-teal-800 hover:text-teal-950">Talk to Moeex AI ChatBot</label>
    </div>
    </div>
    {userDetails?.name?.length > 0 &&
    <div>
      <label className="text-[1rem] font-bold text-pretty text-teal-800">Welcome {userDetails?.name}</label>
    </div>
}
    </div>
    {openSidePopUp === true && <Sidebar toggled={openSidePopUp} width="fit-content" className="bg-[#002244] backdrop-brightness-0">
      <Menu>
        <MenuItem className="p-1" active={pathName === "/"} component={<Link href={"/"} />}> Talk to Moeex AI ChatBot </MenuItem>
        <MenuItem className="p-1" active={pathName === "/mychats"} component={<Link href={"/mychats"} />} disabled={userDetails?.id?.length === 0}> My Chat History</MenuItem>
        {!data && <MenuItem className="p-1"><GoogleButton
        onClick={async() => await handleGoogleSignIn()}
        /></MenuItem>} 
        {isAuthenticating && <MenuItem className="p-1"><ClipLoader
    color={"silver"}
    loading={isAuthenticating}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  /></MenuItem>}
        {data && <MenuItem className="p-1"><button onClick={async() => await handleGoogleSignOut()} className="flex items-center justify-center w-[4rem] h-[2rem] rounded-md bg-blue-700 text-slate-200 font-bold">Sign out</button></MenuItem>}
      </Menu>
      </Sidebar>}
      </div>
    )
}

export default NavSidePopup;