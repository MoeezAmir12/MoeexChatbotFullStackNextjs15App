"use client"
import { CircleLoader } from "react-spinners"

const AppLoader = () => {
    return(
        <div className="flex w-screen h-screen justify-center items-center z-[10000] bg-black bg-opacity-25">
            <CircleLoader
             color="silver"
             size={40}

            />
        </div>
    )
}

export default AppLoader;