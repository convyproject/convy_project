import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

import { BASE_URL } from 'src/constant/general'
import token from 'src/utils/token'

const fetcher = Axios.create({
  baseURL: BASE_URL
})

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    const { response } = error

    if (response.status === 401) {
      token.remove()
    }

    return Promise.reject(error)
  }

  return Promise.reject(error)
}

const responseHandler = (response: AxiosResponse): AxiosResponse => {
  if (response && response.data) {
    const { status } = response.data

    if (status === 401) {
      token.remove()
      response.data = { status: 401, error: 'Session expired, please re-login' }
      window.location.reload()
    }
  }

  return response
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const tokenData = token.get()
  if (tokenData && config && config.headers) {
    config.headers.Authorization = `Bearer ${tokenData}`
  }

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

fetcher.interceptors.request.use(
  response => onRequest(response),
  error => onRequestError(error)
)

fetcher.interceptors.response.use(
  // response => response,
  response => responseHandler(response),
  error => errorHandler(error)
)

export default fetcher
