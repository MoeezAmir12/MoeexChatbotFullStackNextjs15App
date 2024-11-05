"use client"


import { Provider } from "react-redux"
import store from "./ProviderStore"
import { SessionProvider } from "next-auth/react"


const AppProvider = ({children} : {children: React.ReactNode}) =>{
return(
<Provider store={store}>
    <SessionProvider>
{children}
</SessionProvider>
</Provider>
)
}

export {AppProvider};