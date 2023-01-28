/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ErrorKeyAuthType, AuthStateType } from 'src/types/authTypes'

// ** Async Imports
import { login, requestMyDataAction } from 'src/store/async/auth'
import { ActionTypes } from '@mui/base'

// Define the initial state using that type
const initialState: AuthStateType = {
  userData: null,
  onReqGetMyData: false,
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Login Builder
    builder.addCase(login.fulfilled, (state, action) => {
      return Object.assign(
        {},
        {
          ...state,
          userData: action.payload.user || null
        }
      )
    })

    // My Data Builder
    builder.addCase(requestMyDataAction.pending, state => {
      return Object.assign(
        {},
        {
          ...state,
          onReqGetMyData: true
        }
      )
    })
    builder.addCase(requestMyDataAction.fulfilled, (state, action) => {
      return Object.assign(
        {},
        {
          ...state,
          onReqGetMyData: false,
          userData: action.payload
        }
      )
    })
    builder.addCase(requestMyDataAction.rejected, state => {
      return Object.assign(
        {},
        {
          ...state,
          onReqGetMyData: false
        }
      )
    })
  }
})

// export const {} = authSlice.actions

export default authSlice.reducer
