import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";
import axios from "axios";

export const registerUser = createAsyncThunk('users/registerUser', 
    async (userData, thunkAPI) => {
        try {
            const { data } = await axios.post('http://localhost:8000/users/register', userData)
            // return data.user
            console.log(data)
        } catch (error) {
            console.error('Register Error: ', error.response?.data || error.message)
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            )
        }
    }
)

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
    initialState: { users: [], user: null, profile: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, 
            (state, action) => {
                console.log('registerUser fulfilled action payload:', action.payload); // Add logging
                state.user = action.payload;
            }
        )
        .addCase(searchUsers.fulfilled, 
            (state, action) => {
                console.log('searchUsers fulfilled action payload:', action.payload); // Add logging
                state.users = action.payload;
            }
        )
        .addCase(followUsers.fulfilled, 
            (state, action) => {
                const { id, data } = action.payload;
                console.log('followUsers fulfilled action payload:', action.payload); // Add logging
                // Update the state with the follow user data
                const userIndex = state.users.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    state.users[userIndex] = data;
                }
            }
        );
    }
});

export default usersSlice.reducer;
// const usersSlice = createSlice({
//     name: 'users',
//     initialState: { users: [], user: null, profile: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(registerUser.fulfilled, 
//             (state, action) => {
//                 state.user = action.payload
//             }
//         )
//         .addCase(searchUsers.fulfilled, 
//             (state, action) => {
//                 state.users = action.payload
//             }
//         )
//         .addCase(followUsers.fulfilled, 
//             (state, action) => {
//                 const { id, data } = action.payload
//                 const user = state.users.find(u => u._id === id)
//                 if(user){
//                     user.followersCount = data.followers.length
//                     user.following = data.following.length
//                 }

//                 if(state.user && state.user._id === id){
//                     state.user.followers = data.followers
//                     state.user.following = data.following
//                 }
//             }
//         )
//         .addCase(fetchUserProfile.fulfilled, 
//             (state, action) => {
//                 state.profile = action.payload
//             }
//         )
//     }
// })

// export default usersSlice.reducer

