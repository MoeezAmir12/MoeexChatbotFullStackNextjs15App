"use client"

import { useSelector } from "react-redux"
import Image from "next/image"
import { IUserInterface } from "@/interfaces/Interface"



const ImageProfile = () => {
const userData = useSelector((state : {
    userReducer: IUserInterface
}) => {
    return state?.userReducer?.userDetails;
})
return(
    <Image alt="Loading..." src={userData?.imgURL} width={30} height={30} className="rounded-full shadow-sm" />
)
}

export default ImageProfile;