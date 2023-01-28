/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: { guestPath: string[]; userPath: string[] } = {
  guestPath: ['/login', '/register', '/accept-invitation', '/onboarding'],
  userPath: []
}

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {}
})

// export const {} = authSlice.actions

export default pathSlice.reducer
