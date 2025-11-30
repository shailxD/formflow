import apiClient from '@/lib/api-client'
import type { SignupRequest, LoginRequest, AuthResponse } from '@/types/auth'

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/signup', data)
  return response.data
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', data)
  return response.data
}

export const logout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout')
}
