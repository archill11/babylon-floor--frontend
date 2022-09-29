export type User = {
  id: string,
  email: string,
  fullName: string,
  password: string,
  avatarUrl: string,
  createdAt: string,
  updatedAt: string,
}
export type PachedUser = {
  fullName?: string;
  avatarUrl?: File[] | string;
}

export enum status {
  LOADING= 'loading',
  SUCCESS= 'success',
  ERROR= 'error',
}

export interface usersSliceState {
  items: User[], 
  user: User | null, 
  folows: any[], 
  status: status
} 