"use client"

import { createSlice } from "@reduxjs/toolkit"
import type { IUserInterface } from "@/interfaces/Interface"

const initialState : IUserInterface = {
   userDetails: {
    name: "",
    email: "",
    imgURL: ""
   }
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        loggedIn: (state,action) => {
        state.userDetails = action.payload
        },
        loggedOut: (state) => {
            state.userDetails = {
                email: "",
                name: "",
                imgURL: ""
            }
        }
    }
})

export default userSlice.reducer;
export const {loggedIn, loggedOut} = userSlice.actions;