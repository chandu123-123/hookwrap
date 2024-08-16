import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  credits:100,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.credits)
      state.credits+=100 // Return a new state object with the updated value
    },
    decrement: (state,action) => {
      console.log(state.credits);
      state.credits-=action.payload
      
      console.log(state.credits)
      // Return a new state object with the updated value
    },
    update: (state,action) => {
      state.credits=action.payload // Return a new state object with the updated value
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement,update} = counterSlice.actions

export default counterSlice.reducer;
