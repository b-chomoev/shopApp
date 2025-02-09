<<<<<<< HEAD
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from './globalConstants.ts';
import { RootState } from './app/store.ts';
import { Store } from '@reduxjs/toolkit';
=======
import axios from "axios";
import { apiUrl } from "./globalConstants.ts";
>>>>>>> 80e8f09 (Some changes.)

const axiosAPI = axios.create({
  baseURL: apiUrl,
});

<<<<<<< HEAD
export const addInterceptors = (store: Store<RootState>) => {
  axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosAPI;
=======
export default axiosAPI;
>>>>>>> 80e8f09 (Some changes.)
