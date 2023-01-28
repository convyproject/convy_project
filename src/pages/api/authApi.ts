import fetcher from './fetcher'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

// ** Type Imports
import { LoginSentDataType, RegisterSentDataType } from 'src/types/authTypes'

export function authAPI(fetch: AxiosInstance) {
  const authAPI = {
    async login(data: LoginSentDataType) {
      const options: AxiosRequestConfig = {
        method: 'POST',
        data
      }
      const result = await fetch(`/auth/email/login`, options)

      return { ...result.data }
    },
    async register(data: RegisterSentDataType) {
      const options: AxiosRequestConfig = {
        method: 'POST',
        data
      }
      const result = await fetch(`/auth/email/register`, options)

      return { ...result.data }
    },
    async getMyData() {
      const options: AxiosRequestConfig = {
        method: 'GET'
      }
      const result = await fetch(`/auth/me`, options)

      return { ...result.data }
    },
    async confirmEmail(token: string) {
      const options: AxiosRequestConfig = {
        method: 'POST',
        data: {
          hash: token
        }
      }
      const result = await fetch(`/auth/email/confirm`, options)

      return { ...result.data }
    }
  }

  return authAPI
}

export default authAPI(fetcher)
