import { createSlice } from "@reduxjs/toolkit";
import { fethOneUser, fethUpdateUser, fethUsers } from "./asyncActions";
import { usersSliceState, status, } from "./types";



const initialState: usersSliceState = { items: [], user: null, folows: [], status: status.SUCCESS, }

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,

  reducers: {
    folow(state, action) {
      if ( state.folows.includes(action.payload, 0) ) {
        const indx = state.folows.indexOf(action.payload)
        state.folows.splice(indx, 1) 
      }else{
        state.folows.push(action.payload) 
      }
    },
  }, 

  extraReducers: (builder) => {
////////fethUsers 
    builder
      .addCase(fethUsers.pending, (state) => {
        state.status = status.LOADING
        state.items = []
      })
      .addCase(fethUsers.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.items = action.payload
      })
      .addCase(fethUsers.rejected, (state) => {
        state.status = status.ERROR
        state.items = []
        alert('Ошибка при запросе данных')
      })
////////fethOneUser 
    builder
      .addCase(fethOneUser.pending, (state) => {
        state.status = status.LOADING
      })
      .addCase(fethOneUser.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.user = action.payload
      })
      .addCase(fethOneUser.rejected, (state) => {
        state.status = status.ERROR
        alert('Ошибка при запросе данных')
      })
////////fethUpdateUser 
    builder
      .addCase(fethUpdateUser.pending, (state) => {
        state.status = status.LOADING
      })
      .addCase(fethUpdateUser.fulfilled, (state) => {
        state.status = status.SUCCESS
      })
      .addCase(fethUpdateUser.rejected, (state) => {
        state.status = status.ERROR
        alert('Ошибка при отправке изменения')
      })
  }
})

export const { folow } = usersSlice.actions;
export default usersSlice.reducer;
