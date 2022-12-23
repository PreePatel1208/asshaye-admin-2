import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/APIRoute/BaseAPIRoute";


const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    response: null,
    isLoad: false,
    forgotPasswordMail: null
}
// API call actions

export const login = createAsyncThunk('user/login', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/login", initialPost)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response)
    }
})

export const forgotPassword = createAsyncThunk('user/forgot', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/v1/dashboard/auth/password/forget", initialPost)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return err.response;
    }
})

export const register = createAsyncThunk('user/register', async (initialPost, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/v1/dashboard/auth/register", initialPost)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})

export const verifyEmail = createAsyncThunk('user/verifyEmail', async (initialPost, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/v1/dashboard/auth/verify", initialPost)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response)
    }
})

export const resetPassword = createAsyncThunk('user/reset-password', async (initialPost, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/v1/dashboard/auth/password/reset", initialPost)
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return err.response
    }
})

export const UserLogout = createAsyncThunk('user/logout', async () => {

    try {
        const response = await axiosInstance.post("v1/dashboard/auth/logout",
            {},
            { headers: { "Authorization": `Bearer ${localStorage.getItem('userAuthToken')}` } })
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return err.response
    }
})
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {

            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },

        addResetMail(state, payload) {
            state.forgotPasswordMail = payload.payload
        },
        resetError(state) {
            state.error = null
        },
        setLoadEvent(state, action) {
            state.isLoad = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                
                state.error = null
                localStorage.setItem("userAuthToken", action.payload.data.data.token)
                state.isLoad = false
            })
            .addCase(login.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(login.pending, (state, action) => {
                state.isLoad = true
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoad = false
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoad = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoad = false
                state.error = null

            })
            .addCase(register.rejected, (state, error) => {
                state.isLoad = false

                state.error = error.payload.error
            })
            .addCase(register.pending, (state, action) => {
                state.isLoad = true
            })

            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.error = null
                state.isLoad = false
            })
            .addCase(verifyEmail.rejected, (state, error) => {
                state.isLoad = false
                state.error = error
            })
            .addCase(verifyEmail.pending, (state, action) => {
                state.isLoad = true
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.error = null
                state.isLoad = false
            })
            .addCase(resetPassword.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.message
            })
            .addCase(resetPassword.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(UserLogout.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(UserLogout.fulfilled, (state, action) => {
                state.error = null
                state.isLoad = false
            })
            .addCase(UserLogout.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
    }
})

export default userSlice
export const { postAdded, addResetMail, resetError, setLoadEvent } = userSlice.actions

export const userReduces = userSlice.reducer;
