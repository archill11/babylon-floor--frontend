import { createSlice } from "@reduxjs/toolkit";
import { fethUsers } from "./asyncActions";
import { fethOneUser } from "./asyncActions"; 
import { usersSliceState, status, } from "./types";



const initialState: usersSliceState = { items: [], user: {}, folows: [], status: status.LOADING, }

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
      builder.addCase(fethUsers.pending, (state) => {
        state.status = status.LOADING
        state.items = []
      })
      builder.addCase(fethUsers.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.items = action.payload
      })
      builder.addCase(fethUsers.rejected, (state) => {
        state.status = status.ERROR
        state.items = []
        alert('Ошибка при запросе данных')
      })

      builder.addCase(fethOneUser.pending, (state) => {
        state.status = status.LOADING
        state.user = {}
      })
      builder.addCase(fethOneUser.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.user = action.payload
      })
      builder.addCase(fethOneUser.rejected, (state) => {
        state.status = status.ERROR
        state.user = {}
        alert('Ошибка при запросе данных')
      })
    }
})
export const { folow } = usersSlice.actions;
export default usersSlice.reducer;
