import { configureStore } from '@reduxjs/toolkit'
import { countryReducer } from './reducer/countrySlice'
import { checkListReducer } from './reducer/permissionSlice'
import { roleReducer } from './reducer/roleSlice'
import StepSlice from './reducer/StepSlice'
import  { userReduces } from './reducer/UserSlice1'
import { websiteReducer } from './reducer/websiteSlice'

 const store = configureStore({
  reducer: {
    users:userReduces,
    step:StepSlice,
    website:websiteReducer,
    country:countryReducer,
    permission:checkListReducer,
    role:roleReducer,
  },
})
export default store