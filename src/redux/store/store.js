import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice.js";
import postReducer from "../Slices/postSlice.js";
import chatReducer from "../Slices/chatSlice.js";
import usersReducer from "../Slices/usersSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        chat: chatReducer,
        users: usersReducer,
    }
})