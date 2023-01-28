import fetcher from './fetcher'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

// ** Type Imports
import {} from 'src/types/userTypes'

export function authAPI(fetch: AxiosInstance) {
  const authAPI = {
    async getMyData() {
      const options: AxiosRequestConfig = {
        method: 'GET'
      }
      const result = await fetch(`/auth/me`, options)

      return { ...result.data }
    }
  }

  return authAPI
}

export default authAPI(fetcher)
