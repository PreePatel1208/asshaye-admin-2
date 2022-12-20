import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import AuthHeader from "../../services/APIRoute/AuthHeader";
import axiosInstance from "../../services/APIRoute/BaseAPIRoute";


const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isLoad: false,
    roles: null,
    isEdit:false
}
// API call actions

export const addRole = createAsyncThunk('user/addRole', async (data, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/v1/dashboard/roles", data, AuthHeader)
        console.log(" response.data", response.data);
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const deleteRole = createAsyncThunk('user/deleteRole', async (id, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.delete(`/v1/dashboard/roles/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
    
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})

export const updaterole = createAsyncThunk('role/updateRole', async (data, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.put(`/v1/dashboard/roles/${data[1].id}`, data[0],  AuthHeader)
        response.data = data
return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const getRole = createAsyncThunk('role/getRole', async (status = "active") => {
    const response = await axiosInstance.get(`v1/dashboard/roles?status=${status}`,AuthHeader)
    return response.data
})
export const trashRole = createAsyncThunk('role/trashRole', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`v1/dashboard/roles/trash/${id}`, {},AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const restoreRole = createAsyncThunk('role/restoreRole', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/v1/dashboard/roles/restore/${id}`, {},AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
       setIsEdit(state){
        state.isEdit=true
       }
    },
    extraReducers(builder) {
     
        builder
            .addCase(addRole.fulfilled, (state, action) => {
                state.error = null

            })
            .addCase(addRole.rejected, (state, error) => {
                state.error = error.payload.error
            })
            .addCase(addRole.pending, (state, action) => {
              
            })  
            .addCase(updaterole.fulfilled, (state, action) => {
                var index = state.roles.findIndex(obj => obj.encrypt_id == action.payload.data[1].id);
                console.log("action.payload", state.roles);
                state.roles[index].name = action.payload.data[0].name
                state.roles[index].permission_ids = action.payload.data[0].permission_ids
                state.roles[index].status = action.payload.data[0].status ? 1 : 0
                state.isLoad = false
                state.error = null
            })
            .addCase(updaterole.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
            .addCase(updaterole.pending, (state, error) => {
                state.error = error
                state.isLoad = true
            })
          
            .addCase(getRole.fulfilled, (state, action) => {
                state.error = null
                state.roles=action.payload.rows
                state.isLoad = false

            })
            .addCase(getRole.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
            .addCase(getRole.pending, (state, error) => {
                state.error = error
                state.isLoad = true
            })  
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.roles = state.roles.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.isLoad = false
                state.error = null
            })
            .addCase(deleteRole.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(deleteRole.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(trashRole.fulfilled, (state, action) => {
                state.roles = state.roles.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.isLoad = false
                state.error = null
            })
            .addCase(trashRole.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(trashRole.pending, (state, action) => {
                state.isLoad = true
            })
            .addCase(restoreRole.fulfilled, (state, action) => {
                state.roles = state.roles.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.isLoad = false
                state.error = null
            })
            .addCase(restoreRole.rejected, (state, error) => {
                state.isLoad = false
                state.error = error.payload.error
            })
            .addCase(restoreRole.pending, (state, action) => {
                state.isLoad = true
            })
    }
})

export default roleSlice
export const { setIsEdit } = roleSlice.actions

export const roleReducer = roleSlice.reducer;
