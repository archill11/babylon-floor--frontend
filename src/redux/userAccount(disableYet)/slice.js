import { createSlice } from "@reduxjs/toolkit";
import { fethUserData } from "./asyncActions"; 



const initialState = { user: {}, status: 'loading', }

const UserDataSlice = createSlice({
    name: "userData",
    initialState: initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fethUserData.pending, (state) => {
            state.status = 'loading'
            state.user = {}
        })
        builder.addCase(fethUserData.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = action.payload
        })
        builder.addCase(fethUserData.rejected, (state) => {
            state.status = 'error'
            state.user = {}
            alert('Ошибка при запросе данных')
        })

    }
})

export default UserDataSlice.reducer;