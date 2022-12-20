import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    websitesPermission: [   
        { id: 1, type_name: 'View' },
        { id: 2, type_name: 'Create' },
        { id: 3, type_name: 'Edit' },
        { id: 4, type_name: 'Delete' },
        { id: 5, type_name: 'View' },
        { id: 6, type_name: 'Create' },
        { id: 7, type_name: 'Edit' },
        { id: 8, type_name: 'Delete' },
        { id: 9, type_name: 'View' },
        { id: 10, type_name: 'Create' },
        { id: 11, type_name: 'Edit' },
        { id: 12, type_name: 'Delete' },
        { id: 13, type_name: 'View' },
        { id: 14, type_name: 'Create' },
        { id: 15, type_name: 'Edit' },
        { id: 16, type_name: 'Delete' },
        { id: 17, type_name: 'View' },
        { id: 18, type_name: 'Create' },
        { id: 19, type_name: 'Edit' },
        { id: 20, type_name: 'Delete' },
        { id: 21, type_name: 'View' },
        { id: 22, type_name: 'Create' },
        { id: 23, type_name: 'Edit' },
        { id: 24, type_name: 'Delete' },
        { id: 25, type_name: 'View' },
        { id: 26, type_name: 'Create' },
        { id: 27, type_name: 'Edit' },
        { id: 28, type_name: 'Delete' },
        { id: 29, type_name: 'View' },
        { id: 30, type_name: 'Create' },
        { id: 31, type_name: 'Edit' },
        { id: 32, type_name: 'Delete' },
        { id: 33, type_name: 'View' },
        { id: 34, type_name: 'Create' },
        { id: 35, type_name: 'Edit' },
        { id: 36, type_name: 'Delete' },
        { id: 37, type_name: 'View' },
        { id: 38, type_name: 'Create' },
        { id: 39, type_name: 'Edit' },
        { id: 40, type_name: 'Delete' },
        { id: 41, type_name: 'View' },
        { id: 42, type_name: 'Create' },
        { id: 43, type_name: 'Edit' },
        { id: 44, type_name: 'Delete' },
        { id: 45, type_name: 'View' },
        { id: 46, type_name: 'Create' },
        { id: 47, type_name: 'Edit' },
        { id: 49, type_name: 'Delete' },
    ],

    countriesPermission: [
        { id: 5, type_name: 'View' },
        { id: 6, type_name: 'Create' },
        { id: 7, type_name: 'Edit' },
        { id: 8, type_name: 'Delete' },
    ],
checkedList:[],
    countries: null,
    websites: null,
    corporates: null,
    instoctor: null,
    programs: null,
    request: null,
    certificate: null,
    admins: null,
    roles: null,
    emailTemplate: null,
    requestCoutry: null,
    requestWebsite: null,
    isEdit:false
}

const permissionSlice = createSlice({

    name: 'permission',
    initialState,
    reducers: {
        websiteChecklist(state, action) {
            state.websites = action.payload
        },
        countriesChecklist(state, action) {
            state.countries = action.payload
        },
        setCheckList(state, action) {
            state.checkedList = action.payload
        },
        resetCheckList(state, action) {
            state.checkedList = []
        },
        // setIsEdit(state, action) {
        //     state.checkedList = []
        // },
    
    },
    extraReducers(builder) {


    }
})

export default permissionSlice
export const {  websiteChecklist, countriesChecklist,setCheckList ,resetCheckList} = permissionSlice.actions

export const checkListReducer = permissionSlice.reducer;
