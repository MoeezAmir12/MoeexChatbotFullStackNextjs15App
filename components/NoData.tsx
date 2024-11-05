"use client"

import Image from "next/image";
import Link from "next/link";

 const EmptyComponent = () => {
    return (
      <div className="w-full h-[90vh] flex flex-col gap-2 justify-center items-center">
          <Image
            src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
            height={234}
            width={350}
            alt="404"
          />
        <h2 className="mb-[14px] mt-5">Oops! You seem to be lost</h2>
        <p className="mb-8">
          No Saved Chats With Moeex AI Assistant found !
        </p>
         <Link href="/">
         <button className="w-fit p-4 flex flex-row items-center bg-blue-800 hover:bg-blue-500">
          Go to home
          </button>
        </Link>
      </div>
    )
  }
  
 export default EmptyComponent; 