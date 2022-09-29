import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { PachedUser, User } from './types'


export const fethUsers = createAsyncThunk<User[]>('users/fethUsers', async () => {
  try {
    const { data } = await axios.get(`/user` )
    return data;
  } catch (err) {
    console.log(err);
  }
})

export const fethOneUser = createAsyncThunk<User, string>('users/fethOneUser', async (id) => {
  try {
    const { data } = await axios.get(`/user/${id}` )
    return data;
  } catch (err) {
    console.log(err);
  }
})

export const fethUpdateUser = createAsyncThunk<any, FormData>('users/fethUpdateUser', async (formD) => {
  try {
    const { data } = await axios.patch(`/user`, formD)
    return data
  } catch (err) {
    console.log(err);
  };
})


