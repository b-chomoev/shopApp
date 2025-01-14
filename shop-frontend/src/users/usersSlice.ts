import { User } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';

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
});

export const usersReducer = usersSlice.reducer;