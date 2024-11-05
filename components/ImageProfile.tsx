"use client"

import { useSelector } from "react-redux"
import Image from "next/image"



const ImageProfile = () => {
const userData = useSelector(state => {
    return state?.userReducer?.userDetails;
})
return(
    <Image alt="Loading..." src={userData?.imgURL} width={30} height={30} className="rounded-full shadow-sm" />
)
}

export default ImageProfile;