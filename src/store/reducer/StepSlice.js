import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  registerStep: 1,
}

export const StepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    next: (state) => {
      state.registerStep += 1
    },
    prev: (state) => {
      state.registerStep -= 1
    },
    setStep: (state, action) => {
      state.registerStep += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { next, prev, setStep } = StepSlice.actions

export default StepSlice.reducer