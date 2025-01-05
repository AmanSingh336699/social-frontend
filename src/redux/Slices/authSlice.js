import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

export const registerUser = createAsyncThunk('users/registerUser', 
    async (userData, thunkAPI) => {
        try {
            const { data } = await axiosInstance.post('/users/register', userData)
            return data.user
        } catch (error) {
            console.error('Register Error: ', error.response?.data || error.message)
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            )
        }
    }
)

export const login = createAsyncThunk('auth/login', 
    async (credentials) => {
        const { data } = await axiosInstance.post('/users/login', credentials)
        return data.user
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