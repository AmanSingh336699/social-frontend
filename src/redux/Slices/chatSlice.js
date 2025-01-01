import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

export const fetchChats = createAsyncThunk('chat/fetchChats', 
    async () => {
        const { data } = await axiosInstance.get('/chats')
        return data
    }
)

export const fetchMessages = createAsyncThunk('chat/fetchMessages', 
    async (chatId) => {
        const { data } = await axiosInstance.get(`/chat/${chatId}/messages`)
        return data
    }
)

const chatSlice = createSlice({
    name: 'chat',
    initialState: { chats: [],
        messages: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.chats = action.payload
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
})

export default chatSlice.reducer