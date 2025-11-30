import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import useAuthStore from '@/store/auth-store'
import { signup, login, logout } from '@/api/auth-api'

export const useSignup = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      toast.success('Signup successful!')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || 'Signup failed. Please try again.',
        )
      }
    },
  })
}

export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      toast.success('Login successful!')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || 'Login failed. Please try again.',
        )
      }
    },
  })
}

export const useLogout = () => {
  const { logout: clearAuth } = useAuthStore()

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      // Always clear local auth state, even if API call fails
      clearAuth()
    },
  })
}
