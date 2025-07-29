import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { AuthUser, LoginCredentials, RegisterCredentials, TokenData } from '../types/auth'
import { login as loginApi, register as registerApi } from '../api/index'

export const useAuthStore = defineStore('auth', () => {
  const credentials = reactive<LoginCredentials>({
    username: '',
    password: '',
  })
  const user = ref<AuthUser | null>(null)
  const tokens = ref<TokenData | null>(null)
  const isAuthenticated = ref(false)

  const login = async () => {
    try {
      const response = await loginApi(credentials)
      const data = response.data.data
      console.log('data',data);
      user.value = data.user
      tokens.value = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }
      isAuthenticated.value = true
      localStorage.setItem('accessToken', data.access_token)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await registerApi(credentials)
      const data = response.data.data
      user.value = data.user
      tokens.value = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }
      isAuthenticated.value = true
      localStorage.setItem('accessToken', data.access_token)
    } catch (error) {
      console.error('Register failed:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    tokens.value = null
    isAuthenticated.value = false
    localStorage.removeItem('accessToken')
  }

  return {
    credentials,
    user,
    tokens,
    isAuthenticated,
    login,
    register,
    logout,
  }
})
