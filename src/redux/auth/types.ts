import { User } from "../users/types"

export type authState = {
  data: User | null,
  status: string,
  logined: boolean
}

export type RegisterUser = {
  id: number,
  email: string,
  fullName: string,
  password: string,
  avatarUrl: string,
  createdAt: string,
  updatedAt: string,
  token: string
}
export type RegisterDto = {
  email: string,
  fullName: string,
  password: string,
}

export type LoginUser = {
  id: number,
  email: string,
  fullName: string,
  userData: { email: string }
  token: string
}
export type LoginDto = {
  email: string,
  password: string,
}