import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
import { authReducer } from './auth/slice'
import  dialogsReducer  from './dialogs/slice'
import  {appContexReducer}  from './app-context/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
    appContext: appContexReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

