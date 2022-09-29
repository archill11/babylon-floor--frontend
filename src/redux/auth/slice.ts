import { createSlice } from "@reduxjs/toolkit"
import { fetchAuthMe, fetchLogin, fetchRegister } from "./asyncActions"
import { authState } from "./types"





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
  extraReducers: (builder) => {
////////fetchLogin   
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.logined = true
      state.status = 'success'
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null
      state.status = 'error'
    })
////////fetchRegister
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.logined = true
      state.status = 'success'
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null
      state.status = 'error'
    })
////////fetchAuthMe
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload
      state.logined = true
      state.status = 'success'
    })
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null
      state.status = 'error'
    })
  }
})


export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer