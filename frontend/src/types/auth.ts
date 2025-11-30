import type { User } from '@/store/auth-store'

export interface SignupRequest {
  username: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}
