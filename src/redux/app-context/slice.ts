//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../utils/axios"
import { themeState } from "./types"






const initialState: themeState = { theme: 'light',  }
const appContextSlice = createSlice({
  name: 'app-context',
  initialState: initialState,

  reducers: {
    changeTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  },
  
})



export const { changeTheme } = appContextSlice.actions;
export const appContexReducer = appContextSlice.reducer