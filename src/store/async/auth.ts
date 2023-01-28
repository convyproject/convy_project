import { createAsyncThunk } from '@reduxjs/toolkit'

// Axios Imports
import { isAxiosError } from 'axios'

// ** API Imports
import authApi from 'src/pages/api/authApi'

// ** Type Imports
import { LoginSentDataType, RegisterSentDataType } from 'src/types/authTypes'

// ** Utils Import
import token from 'src/utils/token'

export const login = createAsyncThunk('user/myDataRequest', async (data: LoginSentDataType, { rejectWithValue }) => {
  try {
    const response = await authApi.login({ email: data.email, password: data.password })
    token.save(response.token)

    return response
  } catch (err) {
    if (isAxiosError(err)) {
      return rejectWithValue(err.response?.data || err.message)
    } else {
      return rejectWithValue(err)
    }
  }
})

export const register = createAsyncThunk(
  'auth/registerRequest',
  async (data: RegisterSentDataType, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data)

      return response
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data || err.message)
      } else {
        return rejectWithValue(err)
      }
    }
  }
)

export const requestMyDataAction = createAsyncThunk('auth/requestMyData', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.getMyData()

    return response
  } catch (err) {
    if (isAxiosError(err)) {
      return rejectWithValue(err.response?.data || err.message)
    } else {
      return rejectWithValue(err)
    }
  }
})
