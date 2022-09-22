//@ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";
import axios from "../../utils/axios";


export const fethMyDialogs = createAsyncThunk<Item[], string[]>('dialogs/fethMyDialogs', async () => {
  const { data } = await axios.get<Item[]>(`/chat` )
 
  const dialogs =  data.dialogs.map((item: any) => { 
    const index = item.users.findIndex((user: any) => user.id === data.userId)
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.users.splice(index, 1)
    return newItem
  })
  return dialogs;
})

export const fethMessages = createAsyncThunk<Item[], string[]>('dialogs/fethMessages', async (id) => {
  const { data } = await axios.get<Item[]>(`/message/${id}` )
  return data;
})

export const createDialog = createAsyncThunk<Item[], string[]>('dialogs/createDialog', async (data1) => {
  const { data } = await axios.post<Item[]>(`/chat`, data1 )
  return data;
})

// export const sendMessage = createAsyncThunk<Item[], string[]>('dialogs/sendMessage', async ([chatId, name, avatarUrl, text]) => {
//   const body = {
//     chatId,
//     name,
//     avatarUrl,
//     text,
//   }
//   const { data } = await axios.post<Item[]>(`/message/`, body )
//   return data;
// })
