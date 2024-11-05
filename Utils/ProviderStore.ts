"use client"


import { configureStore } from "@reduxjs/toolkit"
import userSlice from "@/redux/UserSlice"

const store = configureStore({
    reducer: {
        userReducer : userSlice
    }
})

export default store;