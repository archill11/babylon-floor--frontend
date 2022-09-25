//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { fethMyDialogs, fethMessages, createDialog } from "./asyncActions";
import { dialogsSliceState, status } from "./types";



const initialState: dialogsSliceState = { items: [], messages: [], createdDialogId: null, status: status.LOADING, }

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState: initialState,

    reducers: {},
    
    extraReducers: (builder) => {
      builder.addCase(fethMyDialogs.pending, (state) => {
        state.status = status.LOADING
      })
      builder.addCase(fethMyDialogs.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.items = action.payload
      })
      builder.addCase(fethMyDialogs.rejected, (state) => {
        state.status = status.ERROR
        state.items = []
        alert('Ошибка при запросе данных')
      })

      builder.addCase(fethMessages.pending, (state) => {
        state.status = status.LOADING
        state.messages = []
      })
      builder.addCase(fethMessages.fulfilled, (state, action) => {
        state.status = status.SUCCESS
        state.messages = action.payload
      })
      builder.addCase(fethMessages.rejected, (state) => {
        state.status = status.ERROR
        state.messages = []
        alert('Ошибка при запросе данных')
      })

     
    }
})

export default dialogsSlice.reducer;
