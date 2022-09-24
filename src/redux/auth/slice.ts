//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../utils/axios"
import { authState } from "./types"


export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (args) => {
    const { data } = await axios.post('/auth/login', args)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (args) => {
    const { data } = await axios.post('/auth/register', args)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/user/me/' )
    return data
})



const initialState: authState = { data: null, status: 'loading', logined: false }
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    logout(state) {
      state.data = null
      state.logined = false
    }
  },
  extraReducers: {
////////fetchLogin   
    [fetchLogin.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.logined = true
      state.status = 'success'
    },
    [fetchLogin.rejected]: (state, action) => {
      state.data = null
      state.status = 'error'
    },
////////fetchRegister
    [fetchRegister.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.logined = true
      state.status = 'success'
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null
      state.status = 'error'
    },
////////fetchAuthMe
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload
      state.logined = true
      state.status = 'success'
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null
      state.status = 'error'
    },
  }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer