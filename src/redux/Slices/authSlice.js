import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";
import axios from "axios";

export const login = createAsyncThunk('auth/login', 
    async (credentials) => {
        const { data } = await axios.post('http://localhost:8000/users/login', credentials)
        // return data.user
        console.log('data: ', data)
    }
)

export const logout = createAsyncThunk('auth/logout',
    async () => {
        await axiosInstance.post('/users/logout')
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled,
            (state, acion) => {
                state.user = acion.payload
            }
        )
        .addCase(logout.fulfilled,
            (state) => {
                state.user = null
            }
        )
    },
})

export default authSlice.reducer