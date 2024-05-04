import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './Auth.types'
import { removeCredentialsFromCoockies } from 'utils/auth.helper'

const initialState: AuthState = {
  isLoggedIn: false,
  data: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<AuthState>) => { 
      state.isLoggedIn = true;
      state.data = action.payload.data;
    },
    logOut: (state) => {
      removeCredentialsFromCoockies();
      state.isLoggedIn = false;
      state.data = null;
    },
    getMe: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.data = action.payload.data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getMe, logIn, logOut } = authSlice.actions

export default authSlice.reducer