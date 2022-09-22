export type Dialog = {
  id: string,
  createdAt: string,
  updatedAt: string,
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

export interface dialogsSliceState { items: Dialog[], messages: Message[], createdDialogId: any, status: status} 