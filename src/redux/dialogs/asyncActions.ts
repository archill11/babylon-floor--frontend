
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { User } from "../users/types";
import { Dialog, Message, UserChatList } from "./types";


export const fethMyDialogs = createAsyncThunk<Dialog[]>('dialogs/fethMyDialogs', async () => {
  const { data } = await axios.get(`/chat` )
 
  const dialogs =  data.dialogs.map((item: Dialog) => { 
    const index = item.users.findIndex((user: User) => user.id === data.userId)
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.users.splice(index, 1)
    return newItem
  })
  return dialogs;
})

export const fethMessages = createAsyncThunk<Message[], string>('dialogs/fethMessages', async (id) => {
  const { data } = await axios.get(`/message/${id}` )
  return data;
})



//уже не нужны тк есть сокеты

// export const createDialog = createAsyncThunk<Item[], string[]>('dialogs/createDialog', async (data1) => {
//   const { data } = await axios.post<Item[]>(`/chat`, data1 )
//   return data;
// })

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
