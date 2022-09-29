
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../utils/axios"
import { User } from "../users/types"
import { LoginDto, LoginUser, RegisterDto, RegisterUser } from "./types"



export const fetchLogin = createAsyncThunk<LoginUser, LoginDto>('auth/fetchLogin', async (args) => {
  const { data } = await axios.post('/auth/login', args)
  return data
})

export const fetchRegister = createAsyncThunk<RegisterUser, RegisterDto>('auth/fetchRegister', async (args) => {
  const { data } = await axios.post('/auth/register', args)
  return data
})

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/user/me/' )
  return data
})