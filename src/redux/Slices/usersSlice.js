import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";


export const searchUsers = createAsyncThunk('users/searchUsers', 
    async (query) => {
        const { data } = await axiosInstance.get(`/users/search?query=${query}`)
        return data
    }
)

export const followUsers = createAsyncThunk('users/followUsers', 
    async (id) => {
        const { data } = await axiosInstance.post(`/users/follow/${id}`)
        return { id, data }
    }
)

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', 
    async (id) => {
        const { data } = await axiosInstance.get(`users/profile/${id}`)
        return data
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [], profile: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(searchUsers.fulfilled, 
            (state, action) => {
                state.users = action.payload
            }
        )
        .addCase(followUsers.fulfilled, 
            (state, action) => {
                const { id, data } = action.payload
                const user = state.users.find(u => u._id === id)
                if(user){
                    user.followersCount = data.followers.length
                    user.following = data.following.length
                }
            }
        )
        .addCase(fetchUserProfile.fulfilled, 
            (state, action) => {
                state.profile = action.payload
            }
        )
    }
})

export default usersSlice.reducer

