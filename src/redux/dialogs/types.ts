import { User } from "../users/types"

export interface UserChatList {
  dialogs: Dialog[],
  userId: number
}

export type Dialog = {
  id: string,
  createdAt: string,
  updatedAt: string,
  users : User[]
}

export type Message = {
  id: string,
  avatarUrl: string,
  name: string,
  text: string,
  state: boolean,
  createdAt: string,
  updatedAt: string,
}

export enum status {
  LOADING= 'loading',
  SUCCESS= 'success',
  ERROR= 'error',
}

export interface dialogsSliceState { 
  items: Dialog[], 
  messages: Message[], 
  createdDialogId: number | string, 
  status: status
} 