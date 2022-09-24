//@ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { User } from './types'


export const fethUsers = createAsyncThunk<User[]>('users/fethUsers', async () => {
  const { data } = await axios.get<User[]>(`/user` )
  return data;
})

export const fethOneUser = createAsyncThunk<User, string[]>('users/fethOneUser', async (id) => {
  const { data } = await axios.get<User>(`/user/${id}` )
  return data;
})

export const fethUpdateUser = createAsyncThunk<User, string[]>('users/fethUpdateUser', async (formD) => {
  const { data } = await axios.patch<User>(`/user`, formD)
  return data;
})


