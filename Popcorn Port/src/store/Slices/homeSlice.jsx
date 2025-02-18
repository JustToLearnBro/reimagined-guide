import { createSlice } from '@reduxjs/toolkit'


export const homeSlice = createSlice({
  name: 'hone',
  initialState:{
    url:[],
    genres:{}
  },
  reducers: {
    getApiconf:(state,action)=>{
        state.url = action.payload
    },
    getgenres:(state,action)=>{
        state.genres = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { getApiconf,getgenres } = homeSlice.actions

export default homeSlice.reducer