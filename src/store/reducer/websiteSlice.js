import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "jquery";
import AuthHeader from "../../services/APIRoute/AuthHeader";
import axiosInstance from "../../services/APIRoute/BaseAPIRoute";
import { useParams } from "react-router-dom";


const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isLoad: false,
    websites: [],
}
// API call actions

export const addWebsite = createAsyncThunk('user/addWebsite', async (data, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/posts", data, AuthHeader)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const getWebsites = createAsyncThunk('user/posts', async (status = "active") => {
    console.log("AuthHeader", AuthHeader);
    try {
        const response = await axiosInstance.get(`/posts`, AuthHeader)
        console.log("response", response.data);

        return response.data
    } catch (error) {
        if (error) {
            console.log(error);
            return error.response
        }
    }
    const response = await axiosInstance.get(`/posts`, AuthHeader)
    return response.data
})

export const uploadPostImage = createAsyncThunk('user/posts/upload', async (data) => {
    try {
        const response = await axiosInstance.post(`/posts/upload`, data, AuthHeader)
        console.log("response", response);
        return response.data

    } catch (err) {
        if (!err.response) {
            throw err
        }
        return err.response
    }
})
export const deleteWebsite = createAsyncThunk('user/deleteWebsite', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/posts/${id}`, AuthHeader)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const editWebsite = createAsyncThunk('post/update', async (data) => {

    try {
        const response = await axiosInstance.put(`posts/${data.id}`, data.data, AuthHeader)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        console.log("err",err);
        return err.response
    }
})

export const slugCheck = createAsyncThunk('post/update', async (slug) => {

    try {
        const response = await axiosInstance.get(`posts/slug/${slug}`, AuthHeader)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        console.log("err",err);
        return err.response
    }
})


export const trashWebsite = createAsyncThunk('user/trashWebsite', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`v1/dashboard/websites/trash/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response)
    }
})
export const restoreWebsite = createAsyncThunk('user/trashWebsite', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/v1/dashboard/websites/restore/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response)
    }
})
export const getSinglePost = createAsyncThunk('posts/edit/detail', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`posts/edit/${id}`, AuthHeader)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response)
    }
})

const websiteSlice = createSlice({

    name: 'website',
    initialState,
    reducers: {
        addResetMail(state, payload) {
            state.forgotPasswordMail = payload.payload
        },
    },
    extraReducers(builder) {

        builder
            .addCase(addWebsite.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                state.isLoad = false
                state.error = null

            })
            .addCase(addWebsite.rejected, (state, error) => {
                state.isLoad = false

                state.error = error.payload.error
            })
            .addCase(addWebsite.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(editWebsite.fulfilled, (state, action) => {

                state.isLoad = false
                state.error = null
            })
            .addCase(editWebsite.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(editWebsite.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(deleteWebsite.fulfilled, (state, action) => {
                state.websites = state.websites.filter(obj => {
                    return obj._id !== action.payload.data.data._id;
                })
                state.isLoad = false
                state.error = null
            })
            .addCase(deleteWebsite.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(deleteWebsite.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(trashWebsite.fulfilled, (state, action) => {
                state.websites = state.websites.filter(obj => {

                    return obj._id !== action.payload.data._id;
                })
                state.isLoad = false
                state.error = null
            })
            .addCase(trashWebsite.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(trashWebsite.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(getWebsites.fulfilled, (state, action) => {
                state.websites = action.payload.result
                console.log("action.payload", action.payload);
                state.error = null
                state.isLoad = false
            })
            .addCase(getWebsites.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
            .addCase(getWebsites.pending, (state, error) => {
                state.error = error
                state.isLoad = true
            })
            .addCase(getSinglePost.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                state.error = null
                state.isLoad = false
            })
            .addCase(getSinglePost.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
            .addCase(getSinglePost.pending, (state, error) => {
                state.error = error
                state.isLoad = true
            })
    }
})

export default websiteSlice
export const { addResetMail } = websiteSlice.actions

export const websiteReducer = websiteSlice.reducer;
