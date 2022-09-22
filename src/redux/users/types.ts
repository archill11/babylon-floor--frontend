export type User = {
  id: string,
  email: string,
  password: string,
  avatarUrl: string,
  createdAt: string,
  updatedAt: string,
}

export enum status {
  LOADING= 'loading',
  SUCCESS= 'success',
  ERROR= 'error',
}

export interface usersSliceState { items: User[], user: User | {}, folows: any[], status: status} 