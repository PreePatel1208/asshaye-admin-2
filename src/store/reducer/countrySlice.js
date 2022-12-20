import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import AuthHeader from "../../services/APIRoute/AuthHeader";
import axiosInstance from "../../services/APIRoute/BaseAPIRoute";


const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isLoad: false,
    countries: null,
}
// API call actions

export const addCountry = createAsyncThunk('user/addcountry', async (data, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/v1/dashboard/countries", data, AuthHeader)
        console.log(" response.data", response.data);
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const deleteCountry = createAsyncThunk('user/deletecountry', async (id, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.delete(`/v1/dashboard/countries/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        console.log("err add",err);
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const restoreCountry = createAsyncThunk('user/restorecountry', async (id, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`/v1/dashboard/countries/restore/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        console.log("err add",err);
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})
export const getCountry = createAsyncThunk('user/countries', async (status = "active") => {
    const response = await axiosInstance.get(`/v1/dashboard/countries?paginate=1000&status=${status}`)
    return response.data
})
export const editCountry = createAsyncThunk('user/editcountry', async (data) => {
    try {
        const response = await axiosInstance.put(`/v1/dashboard/countries/${data[1].id}`,data[0], AuthHeader)
        return response
    } catch (err) {
       console.log("err lice",err);
        if (!err.response) {
            throw err
        }

        return err.response
    }
})
export const trashCountry = createAsyncThunk('user/trashcountry', async (id, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`/v1/dashboard/countries/trash/${id}`, AuthHeader)
        response.data.id = id
        return response
    } catch (err) {
        console.log("err add",err);
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response)
    }
})


const countrySlice = createSlice({
  
    name: 'country',
    initialState,
    reducers: {
        addResetMail(state, payload) {
            state.forgotPasswordMail = payload.payload
        },
       
    },
    extraReducers(builder) {
     
        builder
            .addCase(addCountry.fulfilled, (state, action) => {
                state.error = null

            })
            .addCase(addCountry.rejected, (state, error) => {
                state.error = error.payload.error
            })
            .addCase(addCountry.pending, (state, action) => {
              
            })  
            .addCase(editCountry.fulfilled, (state, action) => {
                var index = state.countries.findIndex(obj => obj.encrypt_id == action.payload.data[1].id);
                state.countries[index].title = action.payload.data[0].title
                state.countries[index].sort = action.payload.data[0].sort
                state.countries[index].status = action.payload.data[0].status ? 1 : 0
                state.isLoad = false
                state.error = null

            })
            .addCase(editCountry.rejected, (state, error) => {

                state.error = error.payload.error
            })
            .addCase(editCountry.pending, (state, action) => {
            })  
            .addCase(deleteCountry.fulfilled, (state, action) => {
                state.countries = state.countries.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.error = null
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.error = null
                state.countries = action.payload.rows
                state.isLoad = false

            })
            .addCase(getCountry.rejected, (state, error) => {
                state.error = error
                state.isLoad = false
            })
            .addCase(getCountry.pending, (state, error) => {
                state.error = error
                state.isLoad = true
            })
            .addCase(deleteCountry.rejected, (state, error) => {
                state.error = error.payload.error
            })
            .addCase(deleteCountry.pending, (state, action) => {
            })  
            .addCase(trashCountry.fulfilled, (state, action) => {
                state.countries = state.countries.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.error = null
            })
            .addCase(trashCountry.rejected, (state, error) => {
                state.error = error.payload.error
            })
            .addCase(trashCountry.pending, (state, action) => {
            })  
            .addCase(restoreCountry.fulfilled, (state, action) => {
                state.countries = state.countries.filter(obj => {
                    return obj.id !== action.payload.data.id;
                })
                state.error = null
            })
            .addCase(restoreCountry.rejected, (state, error) => {
                state.error = error.payload.error
            })
            .addCase(restoreCountry.pending, (state, action) => {
            })   
    }
})

export default countrySlice
export const { addResetMail } = countrySlice.actions

export const countryReducer = countrySlice.reducer;
