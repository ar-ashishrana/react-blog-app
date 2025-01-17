import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../appwrite/config";

const initialState = {
    post: false,
    postData: [],
}
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async(_, {dispatch})=>{
    const posts = await service.getPosts([]);
    if (posts) {
        dispatch(fetchPost({ posts })); 
    }
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        fetchPost: (state, action)=>{
            state.post = true;
            state.postData = action.payload.posts.documents;
        }
    }
});

export const { fetchPost } = postSlice.actions;
export default postSlice.reducer;