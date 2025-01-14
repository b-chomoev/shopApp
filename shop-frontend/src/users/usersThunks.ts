import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterMutation, RegisterResponse } from '../types';
import axiosApi from '../axiosApi.ts';

export const register = createAsyncThunk(
  'users/register',
  async (registerMutation: RegisterMutation) => {
    const response = await axiosApi.post<RegisterResponse>('/users/register', registerMutation);
    return response.data;
  }
);