import { User } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import { register } from './usersThunks.ts';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: false,
};

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = false;
      })
      .addCase(register.fulfilled, (state, {payload: registerResponse}) => {
        state.registerLoading = false;
        state.user = registerResponse.user;
      })
      .addCase(register.rejected, (state) => {
        state.registerLoading = false;
        state.registerError = true;
      });
  }
});

export const usersReducer = usersSlice.reducer;