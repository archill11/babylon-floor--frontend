import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
import { authReducer } from './auth/slice'
import  dialogsReducer  from './dialogs/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

