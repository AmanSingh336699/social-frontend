// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance.js";

// export const fetchPosts = createAsyncThunk('posts/fetchPosts',
//     async () => {
//         const { data } = await axiosInstance.get('/posts')
//         return data
//     }
// )

// export const likePost = createAsyncThunk('posts/likePost', 
//     async (postId) => {
//         const { data } = await axiosInstance.put(`/posts/${postId}/like`)
//         return { postId, likes: data }
//     }
// )

// export const addComment = createAsyncThunk('posts/comment', 
//     async ({ postId, comment }) => {
//         const { data } = await axiosInstance.post(`/posts/${postId}/comment`, {
//             text: comment
//         })
//         return { postId, comments: data }
//     }
// )
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('http://localhost:8000/posts');
            return data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const likePost = createAsyncThunk('posts/likePost', 
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.put(`/posts/${postId}/like`);
            return { postId, likes: data };
        } catch (error) {
            console.error('Error liking post:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const addComment = createAsyncThunk('posts/comment', 
    async ({ postId, comment }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(`/posts/${postId}/comment`, { comment });
            return { postId, comment: data };
        } catch (error) {
            console.error('Error adding comment:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

//remaining same

export const createPost = createAsyncThunk('posts/createPost', 
    async () => {
        const { data } = await axiosInstance.post('/posts/create', post, {
            header: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: { posts: [] },
     extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled,
            (state, action) => { state.posts = action.payload }
        )
        .addCase(createPost.fulfilled, (state, action) => state.posts.unshift(action.payload))
        .addCase(likePost.fulfilled, 
            (state, action) => {
                const { postId, likes } = action.payload
                const post = state.posts.find(post => post._id === postId)
                if(post){
                    post.likes = likes
                }
            }
        )
        .addCase(addComment.fulfilled, (state, action) => {
            const { postId, comments } = action.payload
            const post = state.posts.find(post => post._id === postId)
            if(post){
                post.comments = comments
            }
        })
     }

})

export default postSlice.reducer